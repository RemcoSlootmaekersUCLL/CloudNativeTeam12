package be.ucll.service;

import be.ucll.model.Goal;
import be.ucll.model.User;
import be.ucll.repository.GoalRepository;
import be.ucll.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalService(GoalRepository goalRepository,  UserRepository userRepository){
        this.goalRepository=goalRepository;
        this.userRepository = userRepository;
    }

    public List<Goal> getAllGoals(){
        return goalRepository.findAll();
    }
    public Goal getGoal(String id) {
        Goal goal = goalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Goal met id: " + id + " bestaat niet."));
        return goal;
    }

    public Goal createGoal(Goal goal) {
        User user = userRepository.findById(goal.getUserId()).orElseThrow(()-> new RuntimeException("User with id "+goal.getUserId()+ " does not exist."));
        user.setGoal(goal);
        goalRepository.save(goal);
        userRepository.save(user);
        return goal;
    }

    //Changes every field other than id and userId
    public Goal editGoal(Goal changed_goal, String id) {
        Goal old_goal=goalRepository.findById(id).orElseThrow(()-> new RuntimeException("Goal with id "+id+ " not found."));
        //Make sure the userId is the same
        if(!old_goal.getUserId().equals(changed_goal.getUserId())){
            throw new RuntimeException("Cannot change user of goals");
        }

        // does not change original id
        changed_goal.setId(id);
        //Change goal in user
        User user=userRepository.findById(changed_goal.getUserId()).orElseThrow(()-> new RuntimeException("User with id "+changed_goal.getUserId()+ " not found."));
        user.getGoals().removeIf(goal -> goal.getId().equals(id));
        user.setGoal(changed_goal);
        userRepository.save(user);
        //change goal
        return goalRepository.save(changed_goal);
    }
}

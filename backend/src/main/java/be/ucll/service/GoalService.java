package be.ucll.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import be.ucll.model.Goal;
import be.ucll.model.User;
import be.ucll.repository.GoalRepository;
import be.ucll.repository.UserRepository;

@Service
public class GoalService {
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalService(GoalRepository goalRepository, UserRepository userRepository){
        this.goalRepository=goalRepository;
        this.userRepository = userRepository;
    }

    public List<Goal> getAllGoals(){
        List<Goal> goals = new ArrayList<>();
        goalRepository.findAll().forEach(goals::add);
        return goals;
    }

    public Goal createGoal(Goal goal) {
        User user = userRepository.findById(goal.getUserId()).orElseThrow(()-> new RuntimeException("User with id "+goal.getUserId()+ " does not exist."));
        user.setGoal(goal);
        goalRepository.save(goal);
        userRepository.save(user);
        return goal;
    }
}

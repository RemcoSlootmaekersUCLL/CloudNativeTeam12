package be.ucll.service;

import be.ucll.model.Goal;
import be.ucll.model.User;
import be.ucll.model.Workout;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.GoalRepository;
import be.ucll.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;

    public GoalService(GoalRepository goalRepository, UserRepository userRepository){
        this.goalRepository=goalRepository;
        this.userRepository = userRepository;
    }

    public List<Goal> getAllGoals(){
        return goalRepository.findAll();
    }

    public void deleteGoalById(String id) {
        //Get Goal by id
        Goal deleted_goal= goalRepository.findById(id).orElseThrow(()->new RuntimeException("Goal with id " +id+ " not found."));
        //Remove goal from user
        User user=userRepository.findById(deleted_goal.getUserId()).orElseThrow(()->new RuntimeException("User with id " +deleted_goal.getUserId()+ " not found."));
        user.getGoals().removeIf(workout -> workout.getId().equals(deleted_goal.getId()));
        userRepository.save(user);
        //Remove workout
        goalRepository.delete(deleted_goal);
    }
}

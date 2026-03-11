package be.ucll.service;

import be.ucll.model.User;
import be.ucll.model.Workout;
import be.ucll.repository.GoalRepository;
import be.ucll.repository.UserRepository;
import be.ucll.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final GoalRepository goalRepository;
    private final UserRepository userRepository;
    private final WorkoutRepository workoutRepository;

    public UserService(GoalRepository goalRepository, UserRepository userRepository, WorkoutRepository workoutRepository){
        this.goalRepository=goalRepository;
        this.workoutRepository=workoutRepository;
        this.userRepository= userRepository;
    }

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }
    public User getUserById(String id){
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("User with id "+id+ " does not exist."));
    }


}

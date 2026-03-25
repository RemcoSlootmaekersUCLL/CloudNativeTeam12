package be.ucll.service;

import java.util.ArrayList;
import java.util.List;

import be.ucll.model.Goal;
import be.ucll.model.Workout;
import org.springframework.stereotype.Service;

import be.ucll.dto.LoginResponse;
import be.ucll.model.User;
import be.ucll.repository.GoalRepository;
import be.ucll.repository.UserRepository;
import be.ucll.repository.WorkoutRepository;

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
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
    public User getUserById(String id){
        return userRepository.findById(id).orElseThrow(()-> new RuntimeException("User with id "+id+ " does not exist."));
    }

    public LoginResponse login(String username, String password) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));

        if (!password.equals(user.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password");
        }

        LoginResponse response = new LoginResponse();
        response.setMessage("Login successful");
        response.setUsername(user.getUsername());
        response.setId(user.getId());
        return response;
    }


    public void deleteUserById(String id){
        //Check if user exists
        if(!userRepository.existsById(id)){throw new RuntimeException("User with id " +id+ " not found.");}
        //Delete linked workouts
        workoutRepository.deleteAll(workoutRepository.findByUserId(id));
        //Delete linked goals
        goalRepository.deleteAll(goalRepository.findByUserId(id));
        //Remove workout
        userRepository.deleteById(id);
    }

}

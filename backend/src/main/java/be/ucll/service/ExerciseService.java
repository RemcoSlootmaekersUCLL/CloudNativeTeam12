package be.ucll.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import be.ucll.model.Exercise;
import be.ucll.model.User;
import be.ucll.model.Workout;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.UserRepository;
import be.ucll.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    public ExerciseService(ExerciseRepository exerciseRepository, WorkoutRepository workoutRepository, UserRepository userRepository) {
        this.exerciseRepository = exerciseRepository;
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
    }

    public List<Exercise> getAllExercises() {
        List<Exercise> exercises = new ArrayList<>();
        exerciseRepository.findAll().forEach(exercises::add);
        return exercises;
    }

    public Exercise getExerciseById(String id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise with ID '" + id + "' not found."));
    }

    public void deleteExerciseById(String id) {
        //Delete exercise from workouts
        List<Workout> workouts = workoutRepository.findByExercisesExerciseId(id);

        workouts.forEach(workout ->
            workout.getExercises().removeIf(workoutExercise -> workoutExercise.getExerciseId().equals(id))
        );
        workoutRepository.saveAll(workouts);

        //Update workout in users as well
        List<User> users=userRepository.findAll();
        users.forEach(user ->
                user.getWorkouts().forEach(workout ->
                        workout.getExercises().removeIf(e -> e.getExerciseId().equals(id))
                )
        );
        userRepository.saveAll(users);

        //Delete exercise
        exerciseRepository.deleteById(id);
    }
}

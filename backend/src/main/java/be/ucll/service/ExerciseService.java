package be.ucll.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import be.ucll.model.Exercise;
import be.ucll.model.User;
import be.ucll.model.Workout;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.UserRepository;
import be.ucll.repository.WorkoutRepository;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;
    private final WorkoutRepository workoutRepository;
    private final UserRepository userRepository;

    public ExerciseService(ExerciseRepository exerciseRepository, WorkoutRepository workoutRepository,
            UserRepository userRepository) {
        this.exerciseRepository = exerciseRepository;
        this.workoutRepository = workoutRepository;
        this.userRepository = userRepository;
    }

    @Cacheable("exercises")
    public List<Exercise> getAllExercises() {
        List<Exercise> exercises = new ArrayList<>();
        exerciseRepository.findAll().forEach(exercises::add);
        return exercises;
    }

    // copied from workout service don't know if this would work
    // @Cacheable(value = "exercisesByUser", key = "#userId")
    public Exercise getExerciseById(String id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise with ID '" + id + "' not found."));
    }

    @CacheEvict(value = "exercises", allEntries = true)
    public void deleteExerciseById(String id) {
        // Get the exercise
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise with ID '" + id + "' not found."));
        // Delete exercise from workouts
        List<Workout> workouts = workoutRepository.findByExercisesExerciseId(id);
        workouts.forEach(workout -> workout.getExercises()
                .removeIf(workoutExercise -> workoutExercise.getExerciseId().equals(id)));
        workoutRepository.saveAll(workouts);

        // Update workout in users as well
        List<User> users = (List<User>) userRepository.findAll();
        users.forEach(user -> user.getWorkouts()
                .forEach(workout -> workout.getExercises().removeIf(e -> e.getExerciseId().equals(id))));
        userRepository.saveAll(users);

        // Delete exercise
        exerciseRepository.delete(exercise);
    }

    @CacheEvict(value = "exercises", allEntries = true)
    public Exercise createExercise(Exercise new_exercise) {
        // Check if exercise already exists
        exerciseRepository.findExerciseByName(new_exercise.getName())
                .ifPresent(s -> {
                    throw new RuntimeException("Exercise with name: " + new_exercise.getName() + " already exists.");
                });
        // Save new Exercise
        return exerciseRepository.save(new_exercise);
    }
}

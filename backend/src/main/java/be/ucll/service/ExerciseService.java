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

    public Exercise getExerciseById(String id) {
        return exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise with ID '" + id + "' not found."));
    }

    @CacheEvict(value = "exercises", allEntries = true)
    public void deleteExerciseById(String id) {
        // Get the exercise
        Exercise exercise = exerciseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exercise with ID '" + id + "' not found."));

        // See if exercise is in workouts
        List<Workout> allWorkouts = new ArrayList<>();
        workoutRepository.findAll().forEach(allWorkouts::add);
        List<Workout> workoutsWithExercise = allWorkouts.stream()
                .filter(workout -> workout.getExercises().stream()
                        .anyMatch(e -> e.getExerciseId().equals(id)))
                .toList();

        System.out.println("Workouts with exercise: " + workoutsWithExercise);

        if (!workoutsWithExercise.isEmpty()) {
            throw new RuntimeException("You are not allowed to delete exercise because it is in use in someone's workout.");
        }

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

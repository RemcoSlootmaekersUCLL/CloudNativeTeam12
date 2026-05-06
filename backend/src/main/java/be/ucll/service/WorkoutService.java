package be.ucll.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import be.ucll.dto.WorkoutExerciseResponse;
import be.ucll.dto.WorkoutResponse;
import be.ucll.model.Exercise;
import be.ucll.model.User;
import be.ucll.model.Workout;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.UserRepository;
import be.ucll.repository.WorkoutRepository;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    public WorkoutService(WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository,
            UserRepository userRepository) {
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
        this.userRepository = userRepository;
    }

    // DTO CONVERTER
    private List<WorkoutResponse> convertWorkoutToDTO(List<Workout> workouts) {
        return workouts.stream().map(workout -> {
            List<WorkoutExerciseResponse> exerciseResponses = workout.getExercises().stream().map(we -> {
                Exercise exercise = exerciseRepository.findById(we.getExerciseId()).orElseThrow(
                        () -> new RuntimeException("Exercise with id " + we.getExerciseId() + " does not exist."));
                // Check illegal state of Reps|Duration|CaloriesBurned
                if (we.getReps() <= 0 || we.getDuration() <= 0 || we.getCaloriesBurned() <= 0) {
                    throw new IllegalArgumentException("Reps, duration and calories burned must be bigger than 0.");
                }
                // Create and return exercises dto
                return new WorkoutExerciseResponse(exercise.getId(), exercise.getName(), exercise.getType(),
                        we.getReps(), we.getDuration(), we.getCaloriesBurned());
            }).collect(Collectors.toList());
            // Create and return full dto response
            return new WorkoutResponse(workout.getId(), workout.getUserId(), workout.getDate(), exerciseResponses,
                    workout.getTotalCaloriesBurned());
        }).collect(Collectors.toList());
    }

    @Cacheable("workouts")
    public List<WorkoutResponse> getAllWorkouts() {
        List<Workout> workouts = new ArrayList<>();
        workoutRepository.findAll().forEach(workouts::add);
        return convertWorkoutToDTO(workouts);
    }

    // We can also use cache for every user but this still needs to be decided.(it
    // should be good to just uncomment the line below)
    @Cacheable(value = "workoutsByUser", key = "#userId")
    public List<WorkoutResponse> getWorkoutsByUser(String userId) {
        return convertWorkoutToDTO(workoutRepository.findByUserId(userId));
    }

    // also updated for redis problem with list.of() so using new arraylist
    public WorkoutResponse getById(String id) {
        List<Workout> list = new ArrayList<>();
        list.add(workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout with ID '" + id + "' not found.")));
        return convertWorkoutToDTO(list).getFirst();
    }

    @Caching(evict = {
            @CacheEvict(value = "workouts", allEntries = true),
            @CacheEvict(value = "workoutsByUser", allEntries = true)
    })
    public Workout createWorkoutByUserId(Workout workout, String userId) {
        // Check if path variable and body parameter userId are the same.
        if (!workout.getUserId().equals(userId)) {
            throw new RuntimeException(
                    "Given userId does not match userId of workout you're trying to create. Workout userid: " + userId
                            + "!=" + workout.getUserId());
        }
        // Save new workout
        Workout result = workoutRepository.save(workout);
        // Add workout to user
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with id " + userId + " not found."));
        user.setWorkout(workout);
        userRepository.save(user);
        return result;
    }

    @Caching(evict = {
            @CacheEvict(value = "workouts", allEntries = true),
            @CacheEvict(value = "workoutsByUser", allEntries = true)
    })
    public void deleteWorkoutById(String id) {
        // Get Workout by id
        Workout deleted_workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout with id " + id + " not found."));
        // Remove workout from user
        User user = userRepository.findById(deleted_workout.getUserId())
                .orElseThrow(() -> new RuntimeException("User with id " + deleted_workout.getUserId() + " not found."));
        user.getWorkouts().removeIf(workout -> workout.getId().equals(deleted_workout.getId()));
        userRepository.save(user);
        // Remove workout
        workoutRepository.delete(deleted_workout);
    }

    @Caching(evict = {
            @CacheEvict(value = "workouts", allEntries = true),
            @CacheEvict(value = "workoutsByUser", allEntries = true)
    })
    public Workout editWorkout(Workout changed_workout, String id) {
        Workout old_workout = workoutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout with id " + id + " not found."));
        // Don't let ppl change userid of workout
        if (!old_workout.getUserId().equals(changed_workout.getUserId())) {
            throw new RuntimeException("Cannot change user of workout");
        }
        // Keep id the same as before
        changed_workout.setId(id);

        // Change workout in user
        User user = userRepository.findById(changed_workout.getUserId())
                .orElseThrow(() -> new RuntimeException("User with id " + changed_workout.getUserId() + " not found."));
        user.getWorkouts().removeIf(workout -> workout.getUserId().equals(old_workout.getUserId()));
        user.setWorkout(changed_workout);
        userRepository.save(user);
        // Change workout
        return workoutRepository.save(changed_workout);
    }
}

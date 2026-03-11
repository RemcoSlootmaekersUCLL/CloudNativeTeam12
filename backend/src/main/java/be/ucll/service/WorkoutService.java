package be.ucll.service;

import be.ucll.dto.WorkoutExerciseResponse;
import be.ucll.dto.WorkoutResponse;
import be.ucll.model.Exercise;
import be.ucll.model.User;
import be.ucll.model.Workout;
import be.ucll.model.WorkoutExercise;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.UserRepository;
import be.ucll.repository.WorkoutRepository;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final UserRepository userRepository;

    public WorkoutService(WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository, UserRepository userRepository) {
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
                // Create and return exercises dto
                return new WorkoutExerciseResponse(exercise.getName(), exercise.getType(), we.getReps(),
                        we.getDuration(), we.getCaloriesBurned());
            }).toList();
            // Create and return full dto response
            return new WorkoutResponse(workout.getUserId(), workout.getDate(), exerciseResponses,
                    workout.getTotalCaloriesBurned());
        }).toList();
    }

    public List<WorkoutResponse> getAllWorkouts() {
        return convertWorkoutToDTO(workoutRepository.findAll());
    }

    public List<WorkoutResponse> getWorkoutsByUser(String userId) {
        return convertWorkoutToDTO(workoutRepository.findByUserId(userId));
    }

    public WorkoutResponse getById(String id) {
        return convertWorkoutToDTO(
                List.of(workoutRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Workout with ID '" + id + "' not found."))))
                .getFirst();
    }

    public Workout createWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }

    public Workout editWorkout(Workout changed_workout, String id) {
        Workout old_workout=workoutRepository.findById(id).orElseThrow(()-> new RuntimeException("Workout with id " +id+ " not found."));
        //Don't let ppl change userid of workout
        if(!old_workout.getUserId().equals(changed_workout.getUserId())){
            throw new RuntimeException("Cannot change user of workout");
        }
        //Keep id the same as before
        changed_workout.setId(id);

        //Change workout in user
        User user=userRepository.findById(changed_workout.getUserId()).orElseThrow(()->new RuntimeException("User with id " +changed_workout.getUserId()+ " not found."));
        user.getWorkouts().removeIf(workout -> workout.getUserId().equals(old_workout.getUserId()));
        user.setWorkout(changed_workout);
        userRepository.save(user);
        //Change workout
        return workoutRepository.save(changed_workout);
    }
}

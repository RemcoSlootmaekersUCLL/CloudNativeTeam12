package be.ucll.service;

import java.util.ArrayList;
import java.util.List;

import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.UserRepository;
import be.ucll.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import be.ucll.dto.WorkoutExerciseResponse;
import be.ucll.dto.WorkoutResponse;
import be.ucll.model.Exercise;
import be.ucll.model.User;
import be.ucll.model.Workout;

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
            return new WorkoutResponse(workout.getId(), workout.getUserId(), workout.getDate(), exerciseResponses,
                    workout.getTotalCaloriesBurned());
        }).toList();
    }

    public List<WorkoutResponse> getAllWorkouts() {
        List<Workout> workouts = new ArrayList<>();
        workoutRepository.findAll().forEach(workouts::add);
        return convertWorkoutToDTO(workouts);
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
        //Save new workout (we do this now so that id isn't null for workout in user)
        Workout result=workoutRepository.save(workout);

        //Add workout to user
        User user=userRepository.findById(workout.getUserId()).orElseThrow(()->new RuntimeException("User with id " +workout.getUserId()+ " not found."));
        user.setWorkout(workout);
        userRepository.save(user);
        return result;
    }

    public Workout createWorkoutByUserId(Workout workout, String userId) {
        //Check if path variable and body parameter userId are the same.
        if (!workout.getUserId().equals(userId)){throw new RuntimeException("Given userId does not match userId of workout you're trying to create. Workout userid: "+ userId+ "!=" +workout.getUserId());}
        //Save new workout
        Workout result=workoutRepository.save(workout);
        //Add workout to user
        User user=userRepository.findById(userId).orElseThrow(()->new RuntimeException("User with id " +userId+ " not found."));
        user.setWorkout(workout);
        userRepository.save(user);
        return result;
    }

    public void deleteWorkoutById(String id) {
        //Get Workout by id
        Workout deleted_workout= workoutRepository.findById(id).orElseThrow(()->new RuntimeException("Workout with id " +id+ " not found."));
        //Remove workout from user
        User user=userRepository.findById(deleted_workout.getUserId()).orElseThrow(()->new RuntimeException("User with id " +deleted_workout.getUserId()+ " not found."));
        user.getWorkouts().removeIf(workout -> workout.getId().equals(deleted_workout.getId()));
        userRepository.save(user);
        //Remove workout
        workoutRepository.delete(deleted_workout);
    }
}

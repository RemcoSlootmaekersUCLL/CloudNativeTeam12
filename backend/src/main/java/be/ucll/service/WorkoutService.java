package be.ucll.service;

import be.ucll.model.Workout;
import be.ucll.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkoutService {

    private final WorkoutRepository workoutRepository;

    public WorkoutService(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    public Workout createWorkout(Workout workout) {
        return workoutRepository.save(workout);
    }

    public List<Workout> getWorkoutsByUser(int userId) {
        return workoutRepository.findByUserId(userId);
    }

    public List<Workout> getAllWorkouts() {
        return workoutRepository.findAll();
    }
}

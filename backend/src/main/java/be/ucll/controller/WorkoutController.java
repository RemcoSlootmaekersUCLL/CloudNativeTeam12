package be.ucll.controller;

import be.ucll.dto.WorkoutResponse;
import be.ucll.model.Workout;
import be.ucll.service.WorkoutService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping
    public List<WorkoutResponse> getAll() {
        return workoutService.getAllWorkouts();
    }

    @GetMapping("/user/{userId}")
    public List<WorkoutResponse> getByUser(@PathVariable String userId) {
        return workoutService.getWorkoutsByUser(userId);
    }

    @PostMapping
    public Workout createWorkout(@RequestBody Workout workout) {
        return workoutService.createWorkout(workout);
    }
}

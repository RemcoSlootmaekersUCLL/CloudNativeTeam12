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

    @GetMapping("/{id}")
    public WorkoutResponse getById(@PathVariable String id) {
        return workoutService.getById(id);
    }

    @PostMapping("/user/{userId}")
    public Workout createWorkoutByUserId(@RequestBody Workout workout, @PathVariable String userId) {
        return workoutService.createWorkoutByUserId(workout, userId);
    }

    @DeleteMapping("/{id}")
    public void deleteWorkoutById(@PathVariable String id) {
        workoutService.deleteWorkoutById(id);
    }

    @PutMapping("/{id}")
    public Workout editWorkout(@RequestBody Workout workout, @PathVariable String id){
        return workoutService.editWorkout(workout,id);
    }
}

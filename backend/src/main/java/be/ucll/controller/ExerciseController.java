package be.ucll.controller;

import be.ucll.model.Exercise;
import be.ucll.service.ExerciseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<Exercise> getAll() {
        return exerciseService.getAllExercises();
    }

    @GetMapping("/{id}")
    public Exercise getExerciseById(@PathVariable String id) {
        return exerciseService.getExerciseById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteExerciseById(@PathVariable String id) {
        exerciseService.deleteExerciseById(id);
    }

    @PostMapping
    public Exercise createExercise(@RequestBody Exercise exercise){return exerciseService.createExercise(exercise);}
}

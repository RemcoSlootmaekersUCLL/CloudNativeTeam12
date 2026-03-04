package be.ucll.controller;

import be.ucll.model.Exercise;
import be.ucll.service.ExerciseService;
import be.ucll.service.WorkoutService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/exercises")
public class ExerciseController {
    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    public List<Exercise> getAll(){
        return exerciseService.getAllExercises();
    }

}

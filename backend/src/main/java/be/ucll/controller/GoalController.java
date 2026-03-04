package be.ucll.controller;

import be.ucll.model.Exercise;
import be.ucll.model.Goal;
import be.ucll.service.ExerciseService;
import be.ucll.service.GoalService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalController {
    private final GoalService goalService;

    public GoalController(GoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public List<Goal> getAllGoals(){
        return goalService.getAllGoals();
    }

}

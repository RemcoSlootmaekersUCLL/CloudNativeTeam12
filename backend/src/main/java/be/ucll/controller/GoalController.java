package be.ucll.controller;

import be.ucll.model.Exercise;
import be.ucll.model.Goal;
import be.ucll.service.ExerciseService;
import be.ucll.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3001")
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

    @PostMapping
    public Goal createGoal(@RequestBody Goal goal){
        return goalService.createGoal(goal);
    }
}

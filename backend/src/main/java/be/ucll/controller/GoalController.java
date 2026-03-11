package be.ucll.controller;

import be.ucll.model.Exercise;
import be.ucll.model.Goal;
import be.ucll.service.ExerciseService;
import be.ucll.service.GoalService;
import org.springframework.web.bind.annotation.*;

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

    @PutMapping("/{id}")
    public Goal editGoal(@RequestBody Goal goal, @PathVariable String id){
        return goalService.editGoal(goal,id);
    }
}

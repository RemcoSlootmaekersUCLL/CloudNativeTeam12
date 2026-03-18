package be.ucll.controller;

import be.ucll.model.Goal;
import be.ucll.service.GoalService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
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
    @GetMapping("/{id}")
    public Goal getGoal(@PathVariable String id){
        return goalService.getGoal(id);
    }
    @PostMapping
    public Goal createGoal(@RequestBody Goal goal){
        return goalService.createGoal(goal);
    }

    @PutMapping("/{id}")
    public Goal editGoal(@RequestBody Goal goal, @PathVariable String id){
        return goalService.editGoal(goal,id);
    }
}

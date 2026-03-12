package be.ucll.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import be.ucll.model.Goal;
import be.ucll.repository.GoalRepository;

@Service
public class GoalService {
    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository){
        this.goalRepository=goalRepository;
    }

    public List<Goal> getAllGoals(){
        List<Goal> goals = new ArrayList<>();
        goalRepository.findAll().forEach(goals::add);
        return goals;
    }
}

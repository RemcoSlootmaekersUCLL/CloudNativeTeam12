package be.ucll.service;

import be.ucll.model.Goal;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.GoalRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GoalService {
    private final GoalRepository goalRepository;

    public GoalService(GoalRepository goalRepository){
        this.goalRepository=goalRepository;
    }

    public List<Goal> getAllGoals(){
        return goalRepository.findAll();
    }
}

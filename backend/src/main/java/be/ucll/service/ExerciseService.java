package be.ucll.service;

import be.ucll.model.Exercise;
import be.ucll.repository.ExerciseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseService {
    private final ExerciseRepository exerciseRepository;

    public ExerciseService(ExerciseRepository exerciseRepository){
        this.exerciseRepository=exerciseRepository;
    }

    public List<Exercise> getAllExercises(){
        return exerciseRepository.findAll();
    }

}

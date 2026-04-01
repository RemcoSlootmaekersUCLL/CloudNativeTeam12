package be.ucll.functions;


import be.ucll.model.Exercise;
import be.ucll.service.ExerciseService;
import com.microsoft.azure.functions.annotation.FunctionName;
import org.springframework.stereotype.Component;

@Component
public class ExerciseFunctions /*implements Function<User, Greeting>*/{
    private final ExerciseService exerciseService;

    public ExerciseFunctions(ExerciseService exerciseService){
        this.exerciseService=exerciseService;
    }

    @FunctionName("getExerciseById")
    public Exercise getExerciseById(String id) {
        return exerciseService.getExerciseById(id);
    }
}


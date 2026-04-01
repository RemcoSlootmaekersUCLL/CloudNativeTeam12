package be.ucll.functions;

import be.ucll.model.Exercise;
import be.ucll.service.ExerciseService;
import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.BindingName;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ExerciseHandler {
    private final ExerciseService exerciseService;

    public ExerciseHandler(ExerciseService exerciseService){
        this.exerciseService=exerciseService;
    }

    @FunctionName("getExerciseById")
    public HttpResponseMessage execute(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.GET},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = "exercise/{id}"
            )
            HttpRequestMessage<Optional<String>> request,
            @BindingName("id") String id,
            ExecutionContext context) {

        try {
            Exercise exercise = exerciseService.getExerciseById(id);

            return request.createResponseBuilder(HttpStatus.OK)
                    .body(exercise)
                    .header("Content-Type", "application/json")
                           .build();
        }catch (Exception e) {
            return request.createResponseBuilder(HttpStatus.NOT_FOUND)
                    .body("Exercise not found")
                    .build();
        }
    }
}
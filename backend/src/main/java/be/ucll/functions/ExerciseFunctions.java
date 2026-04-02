package be.ucll.functions;

import be.ucll.model.Exercise;
import be.ucll.service.ExerciseService;
import be.ucll.util.ResponseUtil;
import com.microsoft.azure.functions.*;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.BindingName;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import org.springframework.stereotype.Component;

@Component // Registers class as Spring-managed bean, and allows injections for the service
public class ExerciseFunctions {
    private final ExerciseService exerciseService;
    private final String baseRoutePath="exercises";
    public ExerciseFunctions(ExerciseService exerciseService){
        this.exerciseService=exerciseService;
    }

    //GET
    @FunctionName("getAllExercises")
    public HttpResponseMessage getAllExercises(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.GET},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath
            )
            HttpRequestMessage request) {
        try {
            return ResponseUtil.ok(request, exerciseService.getAllExercises());
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
    @FunctionName("getExerciseById")
    public HttpResponseMessage getExerciseById(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.GET},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/{id}"
            )
            HttpRequestMessage request,
            @BindingName("id") String id,
            ExecutionContext context) {
        try {
            return ResponseUtil.ok(request, exerciseService.getExerciseById(id));
        } catch (Exception e) {
            return ResponseUtil.error(request,  e.getMessage());
        }
    }
    //POST
    @FunctionName("createExercise")
    public HttpResponseMessage createExercise(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.POST},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath
            )
            HttpRequestMessage<Exercise> request) {
        try {
            return ResponseUtil.ok(request, exerciseService.createExercise(request.getBody()));
        } catch (Exception e) {
            return ResponseUtil.error(request,  e.getMessage());
        }
    }
    //DELETE
    @FunctionName("deleteExerciseById")
    public HttpResponseMessage deleteExerciseById(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.DELETE},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/{id}"
            )
            HttpRequestMessage request,
            @BindingName("id") String id) {
        try {
            exerciseService.deleteExerciseById(id);
            return ResponseUtil.okMessage(request, "Exercise was deleted.");
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
}
package be.ucll.functions;

import be.ucll.model.Workout;
import be.ucll.service.WorkoutService;
import be.ucll.util.ResponseUtil;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.BindingName;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class WorkoutFunctions {
    private final WorkoutService workoutService;
    private final String baseRoutePath="workouts";
    public WorkoutFunctions(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }
    //GET
    @FunctionName("getAllWorkouts")
    public HttpResponseMessage getAllWorkouts(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.GET},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath
            )
            HttpRequestMessage request) {
        try {
            return ResponseUtil.ok(request, workoutService.getAllWorkouts());
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
    @FunctionName("getWorkoutById")
    public HttpResponseMessage getWorkoutById(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.GET},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/{id}"
            )
            HttpRequestMessage request, @BindingName("id") String id) {
        try {
            return ResponseUtil.ok(request, workoutService.getById(id));
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
    @FunctionName("getWorkoutByUser")
    public HttpResponseMessage getWorkoutByUser(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.GET},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/user/{userId}"
            )
            HttpRequestMessage request, @BindingName("userId") String userId) {
        try {
            return ResponseUtil.ok(request, workoutService.getWorkoutsByUser(userId));
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
    //POST
    @FunctionName("createWorkout")
    public HttpResponseMessage createWorkout(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.POST},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route =baseRoutePath +"/user/{userId}"
            )
            HttpRequestMessage<Optional<String>> request, @BindingName("userId") String userId) {
        try {
            // Get body
            String body = request.getBody().orElseThrow(() -> new RuntimeException("Missing body"));
            // Deserialize input and get Workout
            Workout workout = ResponseUtil.fromJson(body, Workout.class);
            return ResponseUtil.ok(request, workoutService.createWorkoutByUserId(workout,userId));
        } catch (Exception e) {
            return ResponseUtil.error(request,  e.getMessage());
        }
    }
    //DELETE
    @FunctionName("deleteWorkoutById")
    public HttpResponseMessage deleteWorkoutById(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.DELETE},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/{id}"
            )
            HttpRequestMessage request, @BindingName("id") String id) {
        try {
            workoutService.deleteWorkoutById(id);
            return ResponseUtil.okMessage(request, "Workout was deleted.");
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
}

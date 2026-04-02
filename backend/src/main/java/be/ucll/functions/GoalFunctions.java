package be.ucll.functions;

import be.ucll.model.Goal;
import be.ucll.service.GoalService;
import be.ucll.util.ResponseUtil;
import com.microsoft.azure.functions.ExecutionContext;
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
public class GoalFunctions {
    private final GoalService goalService;
    private final String baseRoutePath="goals";
    public GoalFunctions(GoalService goalService) {
        this.goalService = goalService;
    }

    //GET
    @FunctionName("getAllGoals")
    public HttpResponseMessage getAllGoals(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.GET},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath
            )
            HttpRequestMessage request) {
        try {
            return ResponseUtil.ok(request, goalService.getAllGoals());
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
    @FunctionName("getGoalById")
    public HttpResponseMessage getGoalById(
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
            return ResponseUtil.ok(request, goalService.getGoalById(id));
        } catch (Exception e) {
            return ResponseUtil.error(request,  e.getMessage());
        }
    }

    //POST
    @FunctionName("createGoal")
    public HttpResponseMessage createGoal(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.POST},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route =baseRoutePath
            )
            HttpRequestMessage<Optional<String>> request) {
        try {
            // Get body
            String body = request.getBody().orElseThrow(() -> new RuntimeException("Missing body"));
            // Deserialize input and get Goal
            Goal goal = ResponseUtil.fromJson(body, Goal.class);
            return ResponseUtil.ok(request, goalService.createGoal(goal));
        } catch (Exception e) {
            return ResponseUtil.error(request,  e.getMessage());
        }
    }
    //PUT
    @FunctionName("editGoal")
    public HttpResponseMessage editGoal(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.PUT},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/{id}"
            )
            HttpRequestMessage<Optional<String>> request,@BindingName("id") String id) {
        try {
            // Get body
            String body = request.getBody().orElseThrow(() -> new RuntimeException("Missing body"));
            // Deserialize input and get Goal
            Goal goal = ResponseUtil.fromJson(body, Goal.class);
            return ResponseUtil.ok(request, goalService.editGoal(goal,id));
        } catch (Exception e) {
            return ResponseUtil.error(request,  e.getMessage());
        }
    }
    //DELETE
    @FunctionName("deleteGoalById")
    public HttpResponseMessage deleteGoalById(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.DELETE},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/{id}"
            )
            HttpRequestMessage request, @BindingName("id") String id) {
        try {
            goalService.deleteGoalById(id);
            return ResponseUtil.okMessage(request, "Goal was deleted.");
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
}

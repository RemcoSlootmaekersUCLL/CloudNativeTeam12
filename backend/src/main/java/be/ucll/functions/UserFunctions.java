package be.ucll.functions;

import be.ucll.model.User;
import be.ucll.service.UserService;
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
public class UserFunctions {
    private final UserService userService;
    private final String baseRoutePath="users";
    public UserFunctions(UserService userService) {
        this.userService = userService;
    }

    //GET
    @FunctionName("getAllUsers")
    public HttpResponseMessage getAllUsers(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.GET},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath
            )
            HttpRequestMessage request) {
        try {
            return ResponseUtil.ok(request, userService.getAllUsers());
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
    @FunctionName("getUserById")
    public HttpResponseMessage getUserById(
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
            return ResponseUtil.ok(request, userService.getUserById(id));
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
    //POST
    @FunctionName("login")
    public HttpResponseMessage login(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.POST},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/login"
            )
            HttpRequestMessage<Optional<String>> request) {
        try {
            // Get body
            String body = request.getBody().orElseThrow(() -> new RuntimeException("Missing body"));
            // Deserialize input and get User
            User user = ResponseUtil.fromJson(body, User.class);
            return ResponseUtil.ok(request, userService.login(user.getUsername(),user.getPassword()));
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }

    @FunctionName("register")
    public HttpResponseMessage register(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.POST},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/register"
            )
            HttpRequestMessage<Optional<String>> request) {
        try {
            // Get body
            String body = request.getBody().orElseThrow(() -> new RuntimeException("Missing body"));
            // Deserialize input and get User
            User user = ResponseUtil.fromJson(body, User.class);
            return ResponseUtil.ok(request, userService.register(user));
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
    //DELETE
    @FunctionName("deleteUserById")
    public HttpResponseMessage deleteUserById(
            @HttpTrigger(
                    name = "request",
                    methods = {HttpMethod.DELETE},
                    authLevel = AuthorizationLevel.ANONYMOUS,
                    route = baseRoutePath+"/{id}"
            )
            HttpRequestMessage request,
            @BindingName("id") String id) {
        try {
            userService.deleteUserById(id);
            return ResponseUtil.okMessage(request, "User was deleted.");
        } catch (Exception e) {
            return ResponseUtil.error(request, e.getMessage());
        }
    }
}

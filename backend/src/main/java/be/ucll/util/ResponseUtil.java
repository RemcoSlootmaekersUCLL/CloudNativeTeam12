package be.ucll.util;

import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;

//Not needed for functions, but simplifies code a lot by removing repetition
public class ResponseUtil {
    // Crafts an ok response with JSON data
    public static <T> HttpResponseMessage ok(HttpRequestMessage<?> request, T data) {
        return request.createResponseBuilder(HttpStatus.OK)
                .header("Content-Type", "application/json")
                .body(data)
                .build();
    }
    // Crafts an ok message such as "Exercise has been successfully deleted."
    public static HttpResponseMessage okMessage(HttpRequestMessage<?> request, String message) {
        return request.createResponseBuilder(HttpStatus.OK)
                .header("Content-Type", "application/json")
                .body(message)
                .build();
    }
    // Catches the error messages through the catch(Exception e)
    public static HttpResponseMessage error(HttpRequestMessage<?> request,  String errorMessage) {
        return request.createResponseBuilder(HttpStatus.NOT_FOUND)
                .header("Content-Type", "application/json")
                .body(errorMessage)
                .build();
    }
}
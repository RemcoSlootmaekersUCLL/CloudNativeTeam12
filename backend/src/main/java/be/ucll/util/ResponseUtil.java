package be.ucll.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;

//Not needed for functions, but simplifies code a lot by removing repetition
public class ResponseUtil {
    // Azure functions cannot use type LocalDate because it required specific deserialization from JavaTimeModule, which Azure can't do.
    // Therefor we use an object mapper so that Azure receives the already deserialized LocalDate
    private static final ObjectMapper mapper = new ObjectMapper()
        .registerModule(new JavaTimeModule())
        .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

    // Crafts an ok response with JSON data
    public static <T> HttpResponseMessage ok(HttpRequestMessage<?> request, T data) {
        try {
            // Jackson converts data to JSON string
            String json = mapper.writeValueAsString(data);
            return request.createResponseBuilder(HttpStatus.OK)
                    .header("Content-Type", "application/json")
                    .body(json)
                    .build();
        } catch (Exception e) {
            return error(request, "Serialization error: " + e.getMessage());
        }
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
    // JSON converter for when Azure has to deserialize input
    public static <T> T fromJson(String json, Class<T> classs) {
        try {
            // classs makes sure it knows what class it should deserialize into and return
            return mapper.readValue(json, classs);
        } catch (Exception e) {
            throw new RuntimeException("Deserialization error: " + e.getMessage());
        }
    }
}
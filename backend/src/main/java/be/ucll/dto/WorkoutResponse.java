package be.ucll.dto;

import java.time.LocalDate;
import java.util.List;

public record WorkoutResponse (
        String userId,
        LocalDate date,
        List<WorkoutExerciseResponse> exercises,
        int totalCaloriesBurned){
}

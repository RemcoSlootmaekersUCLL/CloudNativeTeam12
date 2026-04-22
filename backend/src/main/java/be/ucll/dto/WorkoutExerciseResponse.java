package be.ucll.dto;

import be.ucll.model.enums.Type;
import jakarta.validation.constraints.Min;

public record WorkoutExerciseResponse (String id,
                                       String name,
                                       Type type,
                                       @Min(value = 1, message = "Reps must be bigger than 0") int reps,
                                       @Min(value = 1, message = "Duration must be bigger than 0") int duration,
                                       @Min(value = 1, message = "Calories burned must be bigger than 0") int caloriesBurned){

}

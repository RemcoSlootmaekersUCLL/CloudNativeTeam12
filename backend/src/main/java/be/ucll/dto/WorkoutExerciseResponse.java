package be.ucll.dto;

import be.ucll.model.enums.Type;

public record WorkoutExerciseResponse (String id,
                                       String name,
                                       Type type,
                                       int reps,
                                       int duration,
                                       int caloriesBurned){

}

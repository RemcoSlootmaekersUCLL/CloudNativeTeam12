package be.ucll.dto;

import be.ucll.model.Type;

public record WorkoutExerciseResponse (String exerciseName,
                                       Type type,
                                       int reps,
                                       int duration,
                                       int caloriesBurned){

}

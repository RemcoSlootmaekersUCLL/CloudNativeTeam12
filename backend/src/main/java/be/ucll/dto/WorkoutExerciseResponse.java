package be.ucll.dto;

import be.ucll.model.enums.Type;

public class WorkoutExerciseResponse {
    private String id;
    private String name;
    private Type type;
    private int reps;
    private int duration;
    private int caloriesBurned;

    public WorkoutExerciseResponse() {
    }

    public WorkoutExerciseResponse(String id, String name, Type type, int reps, int duration, int caloriesBurned) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.reps = reps;
        this.duration = duration;
        this.caloriesBurned = caloriesBurned;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Type getType() {
        return type;
    }

    public int getReps() {
        return reps;
    }

    public int getDuration() {
        return duration;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }
}
package be.ucll.model;

import jakarta.validation.constraints.Min;

public class WorkoutExercise {
    private String exerciseId;

    @Min(value = 0,message = "Reps must be positive.")
    private int reps;
    @Min(value = 0,message = "Duration must be positive.")
    private int duration;
    @Min(value = 0,message = "Calories burned must be positive.")
    private int caloriesBurned;

    protected WorkoutExercise() {
    }

    public WorkoutExercise(String exerciseId, int reps, int duration, int caloriesBurned) {
        setExerciseId(exerciseId);
        setReps(reps);
        setDuration(duration);
        setCaloriesBurned(caloriesBurned);
    }

    public String getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(String exerciseId) {
        this.exerciseId = exerciseId;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getCaloriesBurned() {
        return caloriesBurned;
    }

    public void setCaloriesBurned(int caloriesBurned) {
        this.caloriesBurned = caloriesBurned;
    }
}

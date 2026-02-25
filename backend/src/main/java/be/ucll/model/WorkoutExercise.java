package be.ucll.model;

public class WorkoutExercise {
    private int exerciseId;
    private int reps;
    private int duration;
    private int caloriesBurned;

    public WorkoutExercise() {
    }

    public WorkoutExercise(int exerciseId, int reps, int duration, int caloriesBurned) {
        setExerciseId(exerciseId);
        setReps(reps);
        setDuration(duration);
        setCaloriesBurned(caloriesBurned);
    }

    public int getExerciseId() {
        return exerciseId;
    }

    public void setExerciseId(int exerciseId) {
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

package be.ucll.model;

import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

import static java.lang.Long.sum;

@Document("workout")
public class Workout {

    @Id
    private String id;

    @NotNull(message = "UserId is required.")
    private String userId;

    @NotNull(message = "Workout date is required.")
    private LocalDate date;

    @NotNull(message = "Exercises are required.")
    private List<WorkoutExercise> exercises;

    protected Workout(){}
    public Workout(String userId, LocalDate date, List<WorkoutExercise> exercises){
        setUserId(userId);
        setDate(date);
        setExercises(exercises);
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public List<WorkoutExercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<WorkoutExercise> exercises) {
        this.exercises = exercises;
    }

    public int getTotalCaloriesBurned() {
        return exercises.stream().mapToInt(WorkoutExercise::getCaloriesBurned).sum();
    }

    public String getId() {
        return this.id;
    }
    public void setId(String id) {
        this.id = id;
    }
}


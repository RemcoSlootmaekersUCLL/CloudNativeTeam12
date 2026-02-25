package be.ucll.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.List;

import static java.lang.Long.sum;

@Document("workout")
public class Workout {

    @Id
    private int id;

    private int userId;
    private LocalDate date;

    private List<WorkoutExercise> exercises;
    public Workout(int userId, LocalDate date, List<WorkoutExercise> exercises){
        setUserId(userId);
        setDate(date);
        setExercises(exercises);
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
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

}


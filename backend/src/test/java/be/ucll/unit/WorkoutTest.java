package be.ucll.unit;

import be.ucll.model.Workout;
import be.ucll.model.WorkoutExercise;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
public class WorkoutTest {
    @Test
    void constructor_shouldInitializeFieldsCorrectly() {
        WorkoutExercise ex1 = new WorkoutExercise("ex1", 5, 10, 100);
        WorkoutExercise ex2 = new WorkoutExercise("ex2", 4, 8, 150);

        LocalDate date = LocalDate.of(2026, 2, 26);
        Workout workout = new Workout("user1", date, List.of(ex1, ex2));

        assertThat(workout.getUserId()).isEqualTo("user1");
        assertThat(workout.getDate()).isEqualTo(date);
        assertThat(workout.getExercises()).hasSize(2);
        assertThat(workout.getTotalCaloriesBurned()).isEqualTo(250);
    }
}

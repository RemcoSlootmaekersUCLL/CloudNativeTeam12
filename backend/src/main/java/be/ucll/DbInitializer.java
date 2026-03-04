package be.ucll;

import be.ucll.model.Exercise;
import be.ucll.model.enums.Type;
import be.ucll.model.Workout;
import be.ucll.model.WorkoutExercise;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

import java.time.LocalDate;
import java.util.List;

@Component
public class DbInitializer {
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    // private final GoalRepository goalRepository;

    @Autowired
    public DbInitializer(WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository) {
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
    }

    @PostConstruct
    public void init() {
        // Ja ik heb chatGPT dit laten generaten, te veel werk

        // Clear collections
        exerciseRepository.deleteAll();
        workoutRepository.deleteAll();

        // =====================
        // 1️⃣ Create Exercises
        // =====================
        Exercise bench = new Exercise("Bench press", Type.STRENGTH);
        Exercise squat = new Exercise("Squat", Type.STRENGTH);
        Exercise deadlift = new Exercise("Deadlift", Type.STRENGTH);
        Exercise bike = new Exercise("Bike", Type.CARDIO);
        Exercise running = new Exercise("Running", Type.CARDIO);
        Exercise rowing = new Exercise("Rowing", Type.CARDIO);
        bench.setId("1");
        squat.setId("2");
        deadlift.setId("3");
        exerciseRepository.saveAll(List.of(bench, squat, deadlift, bike, running, rowing));

        // =====================
        // 2️⃣ Create Workouts
        // =====================
        // Workout 1 – Strength Day
        WorkoutExercise w1e1 = new WorkoutExercise(bench.getId(), 5, 10, 100);
        WorkoutExercise w1e2 = new WorkoutExercise(squat.getId(), 5, 12, 150);

        Workout workout1 = new Workout("user1", LocalDate.now(), List.of(w1e1, w1e2));
        workout1.setId("1");

        // Workout 2 – Cardio Day
        WorkoutExercise w2e1 = new WorkoutExercise(bike.getId(), 1, 30, 250);
        WorkoutExercise w2e2 = new WorkoutExercise(running.getId(), 1, 20, 200);

        Workout workout2 = new Workout("user1", LocalDate.now().minusDays(1), List.of(w2e1, w2e2));
        workout2.setId("2");

        // Workout 3 – Mixed Day
        WorkoutExercise w3e1 = new WorkoutExercise(deadlift.getId(), 4, 8, 180);
        WorkoutExercise w3e2 = new WorkoutExercise(rowing.getId(), 1, 15, 120);

        Workout workout3 = new Workout("user2", LocalDate.now().minusDays(2), List.of(w3e1, w3e2));
        workout3.setId("3");

        // =====================
        // 3️⃣ Save Workouts
        // =====================
        workoutRepository.saveAll(List.of(workout1, workout2, workout3));
    }
}

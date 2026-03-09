package be.ucll;

import be.ucll.model.*;
import be.ucll.model.enums.Type;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.GoalRepository;
import be.ucll.repository.UserRepository;
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
    private final UserRepository userRepository;
    private final GoalRepository goalRepository;

    @Autowired
    public DbInitializer(WorkoutRepository workoutRepository, ExerciseRepository exerciseRepository, UserRepository userRepository, GoalRepository goalRepository){
        this.workoutRepository=workoutRepository;
        this.exerciseRepository=exerciseRepository;
        this.userRepository=userRepository;
        this.goalRepository=goalRepository;
    }

    @PostConstruct
    public void init() {
        // Ja ik heb chatGPT dit laten generaten, te veel werk

        // 1. Clear all existing data
        exerciseRepository.deleteAll();
        workoutRepository.deleteAll();
        goalRepository.deleteAll();
        userRepository.deleteAll();

        // =====================
        // 2️⃣ Create Exercises
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
        // 3️⃣ Create Workouts
        // =====================
        Workout workout1 = new Workout("user1", LocalDate.now(), List.of(
                new WorkoutExercise(bench.getId(), 5, 10, 100),
                new WorkoutExercise(squat.getId(), 5, 12, 150)
        ));

        Workout workout1 = new Workout("user1", LocalDate.now(), List.of(w1e1, w1e2));
        workout1.setId("1");

        // Save workouts so they get IDs
        workoutRepository.saveAll(List.of(workout1, workout2));

        Workout workout2 = new Workout("user1", LocalDate.now().minusDays(1), List.of(w2e1, w2e2));
        workout2.setId("2");

        // Workout 3 – Mixed Day
        WorkoutExercise w3e1 = new WorkoutExercise(deadlift.getId(), 4, 8, 180);
        WorkoutExercise w3e2 = new WorkoutExercise(rowing.getId(), 1, 15, 120);

        Workout workout3 = new Workout("user2", LocalDate.now().minusDays(2), List.of(w3e1, w3e2));
        workout3.setId("3");

        // =====================
        // 5️⃣ Create and Link Users
        // =====================
        User user1 = new User("IronMan88", 30, "securePass123", 85.5, 180);
        user1.setId("user1");
        user1.setWorkout(workout1);
        user1.setGoal(goal1);

        User user2 = new User("CardioQueen", 25, "runFast99", 60.0, 165);
        user2.setId("user2");
        user2.setWorkout(workout2);
        user2.setGoal(goal2);

        // Save users (this persists the references to workouts and goals)
        userRepository.saveAll(List.of(user1, user2));
    }
}

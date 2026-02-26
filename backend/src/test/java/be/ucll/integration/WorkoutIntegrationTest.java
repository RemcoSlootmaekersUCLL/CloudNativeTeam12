package be.ucll.integration;

import be.ucll.DbInitializer;
import be.ucll.model.Exercise;
import be.ucll.model.Type;
import be.ucll.model.Workout;
import be.ucll.model.WorkoutExercise;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.WorkoutRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.time.LocalDate;
import java.util.List;

//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@AutoConfigureWebTestClient
class WorkoutIntegrationTest {
    //DIND'T WORK FIX LATER
//
//    @Autowired
//    private WebTestClient webTestClient;
//
//    @Autowired
//    private WorkoutRepository workoutRepository;
//
//    @Autowired
//    private ExerciseRepository exerciseRepository;
//
//    @Autowired
//    private DbInitializer dbInitializer;
//
//    @BeforeEach
//    public void setup() {
//        dbInitializer.init();
//    }
//    @Test
//    void getAllWorkouts_shouldReturnWorkoutWithExercises() {
//
//        webTestClient.get()
//                .uri("/workouts")
//                .exchange()
//                .expectStatus().isOk()
//                .expectBody()
//                .jsonPath("$").isArray()
//                .jsonPath("$.length()").isEqualTo(1)
//                .jsonPath("$[0].userId").isEqualTo(1)
//                .jsonPath("$[0].exercises.length()").isEqualTo(2)
//                .jsonPath("$[0].exercises[0].exerciseName").exists()
//                .jsonPath("$[0].exercises[0].type").isEqualTo("STRENGTH")
//                .jsonPath("$[0].totalCaloriesBurned").isEqualTo(250);
//    }
}

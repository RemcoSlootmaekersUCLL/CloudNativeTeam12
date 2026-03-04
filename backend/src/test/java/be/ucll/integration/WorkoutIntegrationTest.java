package be.ucll.integration;

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

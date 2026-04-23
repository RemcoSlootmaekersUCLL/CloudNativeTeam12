package be.ucll.dto;

import java.time.LocalDate;
import java.util.List;

public class WorkoutResponse {
        private String id;
        private String userId;
        private LocalDate date;
        private List<WorkoutExerciseResponse> exercises;
        private int totalCaloriesBurned;

        // REDIS REquired
        public WorkoutResponse() {
        }

        public WorkoutResponse(String id, String userId, LocalDate date, List<WorkoutExerciseResponse> exercises,
                        int totalCaloriesBurned) {
                this.id = id;
                this.userId = userId;
                this.date = date;
                this.exercises = exercises;
                this.totalCaloriesBurned = totalCaloriesBurned;
        }

        public String getId() {
                return id;
        }

        public String getUserId() {
                return userId;
        }

        public LocalDate getDate() {
                return date;
        }

        public List<WorkoutExerciseResponse> getExercises() {
                return exercises;
        }

        public int getTotalCaloriesBurned() {
                return totalCaloriesBurned;
        }
}
package be.ucll.repository;

import be.ucll.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
    List<Workout> findByUserId(String userId);

    List<Workout> findByExercisesExerciseId(String id);
}

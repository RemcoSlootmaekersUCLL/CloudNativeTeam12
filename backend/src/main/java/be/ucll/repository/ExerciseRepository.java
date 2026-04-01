package be.ucll.repository;

import be.ucll.model.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    Optional<Exercise> findExerciseByName(String name);
}

package be.ucll.repository;

import be.ucll.model.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ExerciseRepository extends MongoRepository<Exercise, String> {
}

package be.ucll.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;

import be.ucll.model.Exercise;

import java.util.Optional;

public interface ExerciseRepository extends CosmosRepository<Exercise, String> {
    @Override
    Optional<Exercise> findById(String id);
    Optional<Exercise> findExerciseByName(String name);
}

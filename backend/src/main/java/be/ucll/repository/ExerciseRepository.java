package be.ucll.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;

import be.ucll.model.Exercise;

public interface ExerciseRepository extends CosmosRepository<Exercise, String> {
}

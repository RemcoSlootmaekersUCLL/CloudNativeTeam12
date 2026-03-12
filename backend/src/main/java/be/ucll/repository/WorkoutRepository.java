package be.ucll.repository;

import java.util.List;

import com.azure.spring.data.cosmos.repository.CosmosRepository;

import be.ucll.model.Workout;

public interface WorkoutRepository extends CosmosRepository<Workout, String> {
    List<Workout> findByUserId(String userId);
}

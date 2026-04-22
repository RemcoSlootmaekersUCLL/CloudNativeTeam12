package be.ucll.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;

import be.ucll.model.Goal;

import java.util.List;
import java.util.Optional;

public interface GoalRepository extends CosmosRepository<Goal, String> {
    List<Goal> findByUserId(String id);

    @Override
    Optional<Goal> findById(String id);
}

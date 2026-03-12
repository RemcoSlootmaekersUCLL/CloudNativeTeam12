package be.ucll.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;

import be.ucll.model.Goal;

public interface GoalRepository extends CosmosRepository<Goal, String> {
}

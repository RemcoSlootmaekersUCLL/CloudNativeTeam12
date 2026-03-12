package be.ucll.repository;

import java.util.Optional;

import com.azure.spring.data.cosmos.repository.CosmosRepository;

import be.ucll.model.User;
public interface UserRepository extends CosmosRepository<User, String> {
    Optional<User>findByUsername(String username);
}
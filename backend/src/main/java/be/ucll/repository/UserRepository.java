package be.ucll.repository;

import java.util.List;
import java.util.Optional;

import com.azure.spring.data.cosmos.repository.CosmosRepository;

import be.ucll.model.User;
public interface UserRepository extends CosmosRepository<User, String> {
    List<User> findAll();
    Optional<User>findByUsername(String username);
}
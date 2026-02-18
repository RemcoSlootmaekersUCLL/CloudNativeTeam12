package be.ucll;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class DbInitializer {
    
    @PostConstruct
    void init() {}
}

package be.ucll.model;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document("goal")
public class Goal {
    @Id
    private String id;

    @NotNull(message = "Goal name is required.")
    private String name;

    @NotNull(message = "Startdate is required.")
    private LocalDate startDate;

    private LocalDate endDate;

    private boolean wasSuccessful;
    private String userId;

    protected Goal(){}
    public Goal(String userId,String name, LocalDate endDate, LocalDate startDate, boolean wasSuccessful) {
        setUserId(userId);
        setName(name);
        setStartDate(startDate);
        setEndDate(endDate);
        setWasSuccessful(wasSuccessful);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public boolean isWasSuccessful() {
        return wasSuccessful;
    }

    public void setWasSuccessful(boolean wasSuccessful) {
        this.wasSuccessful = wasSuccessful;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}

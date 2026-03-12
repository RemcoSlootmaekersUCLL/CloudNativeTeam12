package be.ucll.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.PartitionKey;

import jakarta.validation.constraints.NotNull;

@Container(containerName = "goal", autoCreateContainer = false)
public class Goal {
    @Id
    private String id;

    @PartitionKey
    @NotNull(message = "Goal name is required.")
    private String name;

    @NotNull(message = "Startdate is required.")
    private LocalDate startDate;

    private LocalDate endDate;

    private boolean was_successful;
    private String userId;

    protected Goal(){}
    public Goal(String userId,String name, LocalDate endDate, LocalDate startDate, boolean was_successful) {
        setUserId(userId);
        setName(name);
        setStartDate(startDate);
        setEndDate(endDate);
        setWas_successful(was_successful);
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

    public boolean isWas_successful() {
        return was_successful;
    }

    public void setWas_successful(boolean was_successful) {
        this.was_successful = was_successful;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}

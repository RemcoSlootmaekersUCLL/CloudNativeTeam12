package be.ucll.model;

import be.ucll.model.enums.Type;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("exercise")
public class Exercise {
    @Id
    private String id;
    @NotNull(message = "Exercise name is required.")
    private String name;

    @NotNull(message = "Exercise type is required.")
    private Type type;

    protected Exercise(){}
    public Exercise(String name, Type type) {
        setName(name);
        setType(type);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}

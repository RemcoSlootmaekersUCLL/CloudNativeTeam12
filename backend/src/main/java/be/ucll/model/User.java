package be.ucll.model;


import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.data.annotation.Id;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.PartitionKey;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@Container(containerName = "users", autoCreateContainer = false)
public class User {
    @PartitionKey
    @Id
    private String id = UUID.randomUUID().toString();

    @NotNull(message = "Username is required.")
    private String username;

    @NotNull(message = "Password is required.")
    private String password;

    @NotNull(message = "Age is required.")
    @Min(value = 0,message = "Age must be positive.")
    private int age;

    @NotNull(message = "Weight is required.")
    @Min(value = 0,message = "Weight must be positive.")
    private double weight;

    @NotNull(message = "Height is required.")
    @Min(value = 0,message = "Height must be positive.")
    private int height;

    private List<Workout> workouts=new ArrayList<>();
    private List<Goal> goals=new ArrayList<>();

    protected User(){}

    public User(String username, int age, String password, double weight, int height) {
        setUsername(username);
        setAge(age);
        setPassword(password);
        setWeight(weight);
        setHeight(height);
    }

    public String getBMI(){
        double bmi=weight/(height*height);

        double underweightThreshold;
        double normalMax;
        double overweightMax;

        // Set thresholds based on age
        //Couldn't find data for under 18 so just coupled with 18-24
        if (age <= 24) {
            underweightThreshold = 18.5;
            normalMax = 24.9;
            overweightMax = 29.9;
        } else if (age <= 34) { // 25-34
            underweightThreshold = 19;
            normalMax = 25.9;
            overweightMax = 30.9;
        } else if (age <= 44) { // 35-44
            underweightThreshold = 20;
            normalMax = 26.9;
            overweightMax = 31.9;
        } else if (age <= 54) { // 45-54
            underweightThreshold = 21;
            normalMax = 27.9;
            overweightMax = 32.9;
        } else if (age <= 64) { // 55-64
            underweightThreshold = 22;
            normalMax = 28.9;
            overweightMax = 33.9;
        } else { // 65+
            underweightThreshold = 23;
            normalMax = 29.9;
            overweightMax = 34.9;
        }

        // Classify BMI
        if (bmi < underweightThreshold) {
            return "Underweight";
        } else if (bmi <= normalMax) {
            return "Healthy";
        } else if (bmi <= overweightMax) {
            return "Overweight";
        } else {
            return "Obese";
        }
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public List<Goal> getGoals() {
        return goals;
    }
    public void setGoals(List<Goal> goals) {
        this.goals = goals;
    }
    public void setGoal(Goal goal){
        this.goals.add(goal);
    }

    public List<Workout> getWorkouts() {
        return workouts;
    }

    public void setWorkouts(List<Workout> workouts) {
        this.workouts = workouts;
    }
    public void setWorkout(Workout workout){
        this.workouts.add(workout);
    }
}

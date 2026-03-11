package be.ucll.service;

import be.ucll.dto.WorkoutExerciseResponse;
import be.ucll.dto.WorkoutResponse;
import be.ucll.model.Exercise;
import be.ucll.model.enums.Type;
import be.ucll.model.Workout;
import be.ucll.model.WorkoutExercise;
import be.ucll.repository.ExerciseRepository;
import be.ucll.repository.WorkoutRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class WorkoutServiceTest {

    @Mock
    private WorkoutRepository workoutRepository;

    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private WorkoutService workoutService;

    private Workout workout;
    private Exercise exercise;

    @BeforeEach
    void setUp() {
        exercise = new Exercise("Bench Press", Type.STRENGTH);
        exercise.setId("ex1");

        WorkoutExercise workoutExercise = new WorkoutExercise("ex1", 5, 10, 100);

        workout = new Workout("user1", LocalDate.now(), List.of(workoutExercise));
    }

    // getAllWorkouts - happy path
    @Test
    void getAllWorkouts_shouldReturnDTOList() {
        when(workoutRepository.findAll()).thenReturn(List.of(workout));

        when(exerciseRepository.findById("ex1")).thenReturn(Optional.of(exercise));

        List<WorkoutResponse> result = workoutService.getAllWorkouts();

        assertThat(result).hasSize(1);
        assertThat(result.getFirst().userId()).isEqualTo("user1");
        assertThat(result.getFirst().exercises()).hasSize(1);
        assertThat(result.getFirst().exercises().getFirst().name()).isEqualTo("Bench Press");
    }

    // getWorkoutsByUser
    @Test
    void getWorkoutsByUser_shouldReturnFilteredWorkouts() {
        when(workoutRepository.findByUserId("user1")).thenReturn(List.of(workout));
        when(exerciseRepository.findById("ex1")).thenReturn(Optional.of(exercise));

        List<WorkoutResponse> result = workoutService.getWorkoutsByUser("user1");

        assertThat(result).hasSize(1);
        assertThat(result.getFirst().userId()).isEqualTo("user1");

        verify(workoutRepository).findByUserId("user1");
    }

    // Missing exercise case
    @Test
    void getAllWorkouts_shouldThrowException_ifExerciseNotFound() {
        when(workoutRepository.findAll()).thenReturn(List.of(workout));

        when(exerciseRepository.findById("ex1")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> workoutService.getAllWorkouts())
                .isInstanceOf(RuntimeException.class)
                .hasMessageContaining("does not exist");
    }

    // Post test
    @Test
    void createWorkout_shouldSaveWorkout() {
        when(workoutRepository.save(workout)).thenReturn(workout);

        Workout result = workoutService.createWorkout(workout);

        assertThat(result).isEqualTo(workout);
        verify(workoutRepository).save(workout);
    }
}
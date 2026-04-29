"use client";

import exerciseService from "@/services/exerciseService";
import workoutService from "@/services/workoutService";
import { Exercises, StatusMessage, WorkoutExercise, Workouts } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  userId: string;
  workoutId: string;
};

const EditWorkout: React.FC<Props> = ({ userId, workoutId }: Props) => {
  const [allExercises, setAllExercises] = useState<Exercises[]>([]);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [workoutDate, setWorkoutDate] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercises[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    [],
  );
  const router = useRouter();

  useEffect(() => {
    exerciseService.getAllExercises().then((data) => setAllExercises(data));
    workoutService
      .getById(workoutId)
      .then((data: Workouts) => {
        setWorkoutDate(data.date);
        setSelectedExercises(data.exercises);
        setWorkoutExercises(
          data.exercises.map((ex) => ({
            exerciseId: String(ex.id),
            reps: ex.reps ?? 0,
            duration: ex.duration ?? 0,
            caloriesBurned: ex.caloriesBurned ?? 0,
          })),
        );
      })
      .catch((err) => console.error(err));
    if (!sessionStorage.getItem("id")) return;
  }, []);

  function handleChange(exercise: Exercises) {
    const isSelected = selectedExercises.some(
      (ex) => ex.name === exercise.name,
    );

    setSelectedExercises((prev) =>
      isSelected
        ? prev.filter((ex) => ex.name !== exercise.name)
        : [...prev, exercise],
    );

    if (isSelected) {
      setWorkoutExercises((prev) =>
        prev.filter((ex) => ex.exerciseId !== exercise.id),
      );
    }
  }

  function handleWorkoutExerciseChange(
    id: string,
    field: keyof WorkoutExercise,
    value: number,
  ) {
    setWorkoutExercises((prev) => {
      const existing = prev.find((ex) => ex.exerciseId === id);
      if (existing) {
        return prev.map((ex) =>
          ex.exerciseId === id ? { ...ex, [field]: value } : ex,
        );
      }
      return [
        ...prev,
        {
          exerciseId: id,
          reps: 0,
          duration: 0,
          caloriesBurned: 0,
          [field]: value,
        },
      ];
    });
  }

  function validateWorkout(
    workoutDate: string,
    workoutExercises: WorkoutExercise[],
  ) {
    const timeRegex = /^(?:(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/;

    if (!workoutDate.trim()) {
      setStatusMessages([
        { message: "Workout time is mandatory.", type: "error" },
      ]);
      return false;
    } else if (!timeRegex.test(workoutDate)) {
      setStatusMessages([
        {
          message: "Date is wrongly formatted or is not a valid date.",
          type: "error",
        },
      ]);
      return false;
    }

    if (workoutExercises.length == 0) {
      setStatusMessages([
        { message: "At least 1 exercise is mandatory.", type: "error" },
      ]);
      return false;
    }
    workoutExercises.forEach(exercise => {
      if(exercise.caloriesBurned<=0 || exercise.duration<=0|| exercise.reps<=0){
        setStatusMessages([
          { message: "Reps, duration and calories burned must be bigger than 0.", type: "error" },
        ]);
        return false;
      }
    });

    setStatusMessages([{ message: "Creating workout...", type: "success" }]);
    return true;
  }

  const editWorkout = () => {
    setStatusMessages([]);

    const workout = {
      userId: userId,
      date: workoutDate,
      exercises: workoutExercises,
    };

    workoutService
      .editWorkout(workout, workoutId)
      .then(() => {
        setStatusMessages([
          { message: "Succesfully edited workout.", type: "success" },
        ]);
        setTimeout(() => router.push("/workouts"), 3000);
      })
      .catch((err) => {
        console.error(err);
        setStatusMessages([
          { message: "Something went wrong..", type: "error" },
        ]);
      });
  };

  return (
    <div>
      <form>
        <div className="flex flex-col">
          <label htmlFor="workoutDate">Workout Date:</label>
          <input
            type="text"
            id="workoutDate"
            value={workoutDate}
            onChange={(e) => setWorkoutDate(e.target.value)}
            className="text-field"
            placeholder="YYYY-MM-DD"
          />
        </div>
        <div>
          <label>Exercises</label>
          <div className="exercise-selection">
            {allExercises.map((exercise) => (
              <label
                key={exercise.name}
                className="flex items-center cursor-pointer gap-1 ml-1"
              >
                <input
                  type="checkbox"
                  className="peer hidden"
                  checked={selectedExercises.some(
                    (ex) => ex.name === exercise.name,
                  )}
                  onChange={() => handleChange(exercise)}
                />
                <div className="w-4 h-4 bg-neutral-800 border border-gray-300 rounded-3xl peer-checked:bg-green-500 peer-checked:border-gray-400" />
                {exercise.name}
              </label>
            ))}
          </div>
          {selectedExercises.map((exercise) => (
            <table key={exercise.name} className="w-full border-collapse">
              <thead>
                <tr>
                  <th colSpan={2} className="text-left p-1">
                    {exercise.name}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-1">Reps</td>
                  <td className="p-1">
                    <input
                      className="text-field"
                      type="number"
                      onChange={(e) =>
                        handleWorkoutExerciseChange(
                          String(exercise.id),
                          "reps",
                          Number(e.target.value),
                        )
                      }
                      placeholder={exercise.reps?.toString()}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-1">Duration (s)</td>
                  <td className="p-1">
                    <input
                      className="text-field"
                      type="number"
                      onChange={(e) =>
                        handleWorkoutExerciseChange(
                          String(exercise.id),
                          "duration",
                          Number(e.target.value),
                        )
                      }
                      placeholder={exercise.duration?.toString()}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-1">Calories Burned</td>
                  <td className="p-1">
                    <input
                      className="text-field"
                      type="number"
                      onChange={(e) =>
                        handleWorkoutExerciseChange(
                          String(exercise.id),
                          "caloriesBurned",
                          Number(e.target.value),
                        )
                      }
                      placeholder={exercise.caloriesBurned?.toString()}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
        {statusMessages.length > 0 && statusMessages[0].type === "error" && (
          <p className="text-red-400">{statusMessages[0].message}</p>
        )}
        <button
          className="p-2 mt-4 rounded-xl bg-gradient-to-br from-blue-500 to-sky-700 border border-slate-400"
          onClick={(e) => {
            e.preventDefault();
            if (validateWorkout(workoutDate, workoutExercises)) editWorkout();
          }}
        >
          Create Workout
        </button>
        {statusMessages.length > 0 && statusMessages[0].type === "success" && (
          <p className="text-green-500">{statusMessages[0].message}</p>
        )}
      </form>
    </div>
  );
};

export default EditWorkout;

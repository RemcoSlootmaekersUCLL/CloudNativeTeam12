"use client";

import exerciseService from "@/services/exerciseService";
import workoutService from "@/services/workoutService";
import { Exercises, StatusMessage, WorkoutExercise } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateWorkout: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [allExercises, setAllExercises] = useState<Exercises[]>([]);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [workoutDate, setWorkoutDate] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercises[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    [],
  );
  const router = useRouter();

  useEffect(() => {
    setUserId(sessionStorage.getItem("id")!);
    exerciseService.getAllExercises().then((data) => setAllExercises(data));
  }, []);

  function handleChange(exercise: Exercises) {
    setSelectedExercises((prev) =>
      prev.some((ex) => ex.id === exercise.id)
        ? prev.filter((ex) => ex.id !== exercise.id)
        : [...prev, exercise],
    );
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
    let is_valid=true;
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
      // Debug console lines
      // console.log(exercise.caloriesBurned,exercise.duration, exercise.reps);
      // console.log(exercise.caloriesBurned<=0,exercise.duration<=0, exercise.reps<=0);
      if(exercise.caloriesBurned<=0){
        setStatusMessages([
          { message: "Calories burned must be bigger than 0.", type: "error" },
        ]);
        is_valid= false;
        return;
      }
      if(exercise.duration<=0){
        setStatusMessages([
          { message: "Duration must be bigger than 0.", type: "error" },
        ]);
        is_valid= false;
        return;
      }
      if(exercise.reps<=0){
        setStatusMessages([
          { message: "Reps must be bigger than 0.", type: "error" },
        ]);
        is_valid= false;
        return;
      }
    });

    if(!is_valid) return false;
    setStatusMessages([{ message: "Creating workout...", type: "success" }]);
    return true;
  }

  function createWorkout() {
    setStatusMessages([]);

    const workout = {
      userId: userId,
      date: workoutDate,
      exercises: workoutExercises,
    };

    workoutService
      .createWorkoutByUserId(workout, userId)
      .then(() => {
        setStatusMessages([
          {
            message: "Workout created, proceeding to workouts page..",
            type: "success",
          },
        ]);
        setTimeout(() => router.push("/workouts"), 3000);
      })
      .catch((err) => {
        console.error(err);
        setStatusMessages([
          { message: "Something went wrong..", type: "error" },
        ]);
      });
  }

  return (
    <>
      <div className="p-3 border-3 border-black   bg-gray-400 rounded-3xl">
        <form>
          <div className="flex flex-col">
            <label htmlFor="workoutDate">Workout Date:</label>
            <input
              type="text"
              id="workoutDate"
              value={workoutDate}
              onChange={(e) => setWorkoutDate(e.target.value)}
              className="text-field placeholder-white "
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div>
            <label>Exercises</label>
            <div className="exercise-selection">
              {allExercises.map((exercise) => (
                <label
                  key={exercise.id}
                  className="flex items-center cursor-pointer gap-1 ml-1"
                >
                  <input
                    type="checkbox"
                    className="peer hidden"
                    checked={selectedExercises.some(
                      (ex) => ex.id === exercise.id,
                    )}
                    onChange={() => handleChange(exercise)}
                  />
                  <div className="w-4 h-4 bg-neutral-800 border border-gray-300 rounded-3xl peer-checked:bg-green-500 peer-checked:border-gray-400" />
                  {exercise.name}
                </label>
              ))}
            </div>
            {selectedExercises.map((exercise) => (
              <table key={exercise.id} className="w-full border-collapse">
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
                        className="text-field placeholder-white"
                        type="number"
                        onChange={(e) =>
                          handleWorkoutExerciseChange(
                            String(exercise.id),
                            "reps",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1">Duration (s)</td>
                    <td className="p-1">
                      <input
                        className="text-field placeholder-white"
                        type="number"
                        onChange={(e) =>
                          handleWorkoutExerciseChange(
                            String(exercise.id),
                            "duration",
                            Number(e.target.value),
                          )
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="p-1">Calories Burned</td>
                    <td className="p-1">
                      <input
                        className="text-field placeholder-white"
                        type="number"
                        onChange={(e) =>
                          handleWorkoutExerciseChange(
                            String(exercise.id),
                            "caloriesBurned",
                            Number(e.target.value),
                          )
                        }
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
              if (validateWorkout(workoutDate, workoutExercises))
                createWorkout();
            }}
          >
            Create Workout
          </button>
          {statusMessages.length > 0 &&
            statusMessages[0].type === "success" && (
              <p className="text-green-500">{statusMessages[0].message}</p>
            )}
        </form>
      </div>
    </>
  );
};

export default CreateWorkout;

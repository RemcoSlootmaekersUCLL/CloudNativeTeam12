"use client";

import exerciseService from "@/services/exerciseService";
import userService from "@/services/userService";
import workoutService from "@/services/workoutService";
import { Exercises, WorkoutExercise, Workouts } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  workoutId: string;
};

const ViewWorkout: React.FC<Props> = ({ workoutId }: Props) => {
  const [allExercises, setAllExercises] = useState<Exercises[]>([]);
  const [workoutDate, setWorkoutDate] = useState<string>("");
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    [],
  );
  const [caloriesBurned, setCaloriesBurned] = useState<number | null>(null);
  const [username, setUsername] = useState<string>("");
  const [viewExDetails, setViewExDetails] = useState<boolean>(false);

  useEffect(() => {
    if (!sessionStorage.getItem("id")) return;

    workoutService
      .getById(workoutId)
      .then((data: Workouts) => {
        userService
          .getUserById(data.userId)
          .then((userData) => setUsername(userData.username))
          .catch((err) => console.error(err));
        setWorkoutDate(data.date);
        setCaloriesBurned(Number(data.totalCaloriesBurned));
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
  }, []);

  useEffect(() => {
    exerciseService.getAllExercises().then((data) => setAllExercises(data));
  });

  return (
    <div className="min-h-screen bg-white text-black">
      <table className="workoutTable">
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Calories Burned</th>
            <th>Exercises</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{username}</td>
            <td>{workoutDate}</td>
            <td>{caloriesBurned}</td>
            <td>
              <button
                onClick={() => setViewExDetails(!viewExDetails)}
                className="justify-center text-white bg-black hover:bg-neutral-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                {viewExDetails
                  ? "Hide exercise details"
                  : "View exercise details"}
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {viewExDetails && (
        <div>
          {workoutExercises.map((ex) => (
            <div key={ex.exerciseId} className="mt-2">
              <h1 className="font-bold text-lg">
                {
                  allExercises.find((exercise) => ex.exerciseId === exercise.id)
                    ?.name
                }
              </h1>
              <table className="workoutExerciseTable mt-2">
                <thead>
                  <tr>
                    <th>Duration</th>
                    <th>Reps</th>
                    <th>Calories Burned</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ex.duration}s</td>
                    <td>{ex.reps}x</td>
                    <td>{ex.caloriesBurned} kcal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewWorkout;

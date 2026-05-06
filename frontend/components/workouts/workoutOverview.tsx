"use client";

import { Users, Workouts } from "@/types";
import Link from "next/link";
import { useState } from "react";

type Props = {
  workouts: Workouts[];
  users: Users[];
};

const WorkoutOverview: React.FC<Props> = ({ workouts, users }) => {
  const [activeWorkout, setActiveWorkout] = useState<Workouts | null>(null);

  function toggleActiveWorkout(workout: Workouts) {
    if (workout != activeWorkout) {
      setActiveWorkout(workout);
      return;
    }
    setActiveWorkout(null);
  }

  return (
    <div
      className={`${activeWorkout ? "flex max-w-[70%] mx-auto items-center" : ""}`}
    >
      {workouts && (
        <table
          className={`mt-2 mx-auto min-w-250 border-collapse border border-gray-300`}
        >
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Exercises</th>
              <th className="border border-gray-300 px-4 py-2">
                View all of user
              </th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((w, i) => (
              <tr key={i}>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {users.find((user) => user.id == w.userId)?.username}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {w.date}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {w.exercises.map((exercise, index) => (
                    <div key={index}>
                      {exercise.name}, {exercise.type}
                    </div>
                  ))}
                </td>
                <td className="py-3 px-2">
                  <div className="flex gap-4 justify-center items-center">
                    <Link href={`/workouts/${w.userId}`} className="button">
                      All workouts of user
                    </Link>
                    {/* <Link
                    href={`/workouts/view/${w.id}`}
                    className="button"
                  >
                    View workout
                  </Link> */}
                    <button
                      className="button"
                      onClick={() => {
                        toggleActiveWorkout(w);
                        console.log(w);
                      }}
                    >
                      View Workout
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div>
        {activeWorkout &&
          activeWorkout.exercises.map((ex, index) => (
            <div key={index} className="mx-auto w-60 mt-2">
              <div>
                <h1 className="text-lg font-bold text-[#444]">{ex.name}</h1>
                <table className="border-separate border border-gray-300 rounded-lg">
                  <tbody>
                    <tr>
                      <td>Reps</td>
                      <td>{ex.reps}x</td>
                    </tr>
                    <tr>
                      <td>Duration</td>
                      <td>{ex.duration} s</td>
                    </tr>
                    <tr>
                      <td className="pr-4">Calories Burned</td>
                      <td className="pr-1">{ex.caloriesBurned} kcal</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkoutOverview;

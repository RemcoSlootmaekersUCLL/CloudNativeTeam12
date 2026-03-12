"use client";

import { StatusMessage } from "@/types";
import { useEffect, useState } from "react";

const CreateWorkout: React.FC = () => {
  const [userId, setUserId] = useState<string>("");
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [workoutName, setWorkoutName] = useState<string>("");
  const [workoutDate, setWorkoutDate] = useState<string>("");
  const [exercises, setExercises] = useState<string[]>([]);

  useEffect(() => {
    setUserId(localStorage.getItem("id")!);
  }, []);

  function validateWorkout(
    workoutName: string,
    workoutDate: string,
    exercises: string[],
  ) {
    if (!workoutName.trim()) {
      setStatusMessages([
        { message: "Workout name is mandatory.", type: "error" },
      ]);
      return false;
    }

    const timeRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!workoutDate.trim()) {
      setStatusMessages([
        { message: "Workout time is mandatory.", type: "error" },
      ]);
      return false;
    } else if (!timeRegex.test(workoutDate)) {
      setStatusMessages([
        {
          message: "Workout time is incorrectly formatted: YYYY-MM-DD.",
          type: "error",
        },
      ]);
      return false;
    }

    if (exercises.length == 0) {
      setStatusMessages([
        { message: "At least 1 exercise is mandatory.", type: "error" },
      ]);
      return false;
    }

    setStatusMessages([
      { message: "Proceeding to create workout...", type: "succes" },
    ]);
    return true;
  }

  // TODO: make API call to create new workout for user with {userId}
  function createWorkout(
    workoutName: string,
    workoutDate: string,
    exercises: string[],
  ) {}

  return (
    <>
      <div>
        <form>
          <div className="flex flex-col">
            <label htmlFor="workoutName">Workout Name:</label>
            <input
              type="text"
              id="workoutName"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              className="text-field"
              placeholder="Leg-day"
            />
          </div>
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
          {/* TODO: Call all exercises and make dropdown / selection */}
          <div className="flex flex-col">
            <label htmlFor="exercises">Exercises:</label>
            <input
              type="text"
              id="exercises"
              value={exercises}
              onChange={(e) =>
                setExercises(Array.from(e.target.value.split(",")))
              }
            />
          </div>
          {statusMessages.length > 0 && statusMessages[0].type === "error" && (
            <p className="text-red-400">{statusMessages[0].message}</p>
          )}
          <button
            className="p-2 mt-4 rounded-xl bg-gradient-to-br from-blue-500 to-sky-700 border border-slate-400"
            onClick={(e) => {
              e.preventDefault();
              if (validateWorkout(workoutName, workoutDate, exercises))
                createWorkout(workoutName, workoutDate, exercises);
            }}
          >
            Create Workout
          </button>
          {statusMessages.length > 0 && statusMessages[0].type === "succes" && (
            <p className="text-green-500">{statusMessages[0].message}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateWorkout;

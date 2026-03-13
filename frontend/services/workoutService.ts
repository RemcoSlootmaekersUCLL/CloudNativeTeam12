import { Workouts } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllWorkouts = async (): Promise<Workouts[]> => {
  const response = await fetch(`${API_URL}/workouts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Er is iets mis gegaan.");
  }

  return response.json();
};

const getWorkoutsFromUser = async (id: string): Promise<Workouts[]> => {
  const response = await fetch(`${API_URL}/workouts/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Er is iets mis gegaan.");
  }

  return response.json();
};

const createWorkout = async (workout: any) => {
  const res = await fetch(`${API_URL}/workouts`, {
    method: "POST",
    body: JSON.stringify(workout),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Something went wrong.");

  const data = res.json();
  console.log(data);
  return data;
};

const workoutService = {
  getAllWorkouts,
  getWorkoutsFromUser,
  createWorkout,
};

export default workoutService;

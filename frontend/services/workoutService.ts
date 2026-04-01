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

const getById = async (id: string) => {
  const res = await fetch(`${API_URL}/workouts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Couldn't get workout.");

  return res.json();
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
    throw new Error("Something went wrong.");
  }

  return response.json();
};

const createWorkoutByUserId = async (workout: any, userId: string) => {
  const res = await fetch(`${API_URL}/workouts/user/${userId}`, {
    method: "POST",
    body: JSON.stringify(workout),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });
  console.log(res.text);
  if (!res.ok) throw new Error("Something went wrong.");

  const data = res.json();
  console.log(data);
  return data;
};

const editWorkout = async (workout: any, workoutId: string) => {
  const res = await fetch(`${API_URL}/workouts/${workoutId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workout),
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Couldn't update workout.");

  return res.json();
};

const deleteWorkout = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/workouts/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  return true;
};

const workoutService = {
  getAllWorkouts,
  getById,
  getWorkoutsFromUser,
  createWorkoutByUserId,
  editWorkout,
  deleteWorkout,
};

export default workoutService;

import { Workouts } from "@/types";

const getAllWorkouts = async (): Promise<Workouts[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts`, {
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/workouts/user/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Er is iets mis gegaan.");
  }

  return response.json();
};

const deleteWorkout = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workouts/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",

    });

    if (!response.ok) {
        throw new Error('Er is iets mis gegaan.');
    }

    return true;
};

const workoutService = {
  getAllWorkouts,
  getWorkoutsFromUser,
  deleteWorkout
};

export default workoutService;

import { Exercises } from "@/types";

const getAllExercises = async (): Promise<Exercises[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercises`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Could not fetch exercises");
  }

  return response.json();
};

const deleteExercise = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/exercises/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try {
      const json = JSON.parse(text);
      message = json.error || text;
    } catch {
    }
    throw new Error(message || "Could not delete exercise");
  }

  return true;
};

const addExercise = async (exercise: Exercises): Promise<Exercises[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercises`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify(exercise),
  });

  if (!response.ok) {
    throw new Error("Could not add exercise");
  }

  return response.json();
};

const exerciseService = {
  getAllExercises,
  deleteExercise,
  addExercise,
};

export default exerciseService;

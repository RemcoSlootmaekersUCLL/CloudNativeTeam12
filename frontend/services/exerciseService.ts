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
        throw new Error('Er is iets mis gegaan.');
    }

    return response.json();
};

const deleteExercise = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/exercises/${id}`, {
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

const exerciseService = {
    getAllExercises,
    deleteExercise
};

export default exerciseService;
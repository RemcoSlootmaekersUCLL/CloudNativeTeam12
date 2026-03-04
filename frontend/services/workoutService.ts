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
        throw new Error('Er is iets mis gegaan.');
    }

    return response.json();
};

const workoutService = {
    getAllWorkouts
};

export default workoutService;
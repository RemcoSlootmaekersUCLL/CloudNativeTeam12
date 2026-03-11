import { Goals } from "@/types";

const getAllGoals = async (): Promise<Goals[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals`, {
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

const goalService = {
    getAllGoals
};

export default goalService;
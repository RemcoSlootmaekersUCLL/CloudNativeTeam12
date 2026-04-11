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
        throw new Error('Er is iets mis gegaan. goal 1');
    }

    return response.json();
};

const addGoal = async (goal: Goals): Promise<Goals[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(goal),

    });

    if (!response.ok) {
        throw new Error('Er is iets mis gegaan. goal 2');
    }

    return response.json();
};

const editGoal = async (goal: Goals, id: string): Promise<Goals[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify(goal),

    });

    if (!response.ok) {
        throw new Error('Er is iets mis gegaan. goal 3');
    }

    return response.json();
};

const getGoal = async (id: string): Promise<Goals> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",

    });

    if (!response.ok) {
        throw new Error('Er is iets mis gegaan. goal 4');
    }

    return response.json();
};

const deleteGoal = async (id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",

    });

    if (!response.ok) {
        throw new Error('Er is iets mis gegaan. goal 5');
    }

    return true;
};

const getGoalsFromUser = async (userId: string): Promise<Goals[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/goals/user/${userId}`, {
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
    getAllGoals,
    editGoal,
    getGoal,
    addGoal,
    deleteGoal,
    getGoalsFromUser
};

export default goalService;
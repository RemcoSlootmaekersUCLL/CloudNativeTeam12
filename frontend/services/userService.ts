import { Users } from "@/types";

const getAllUsers = async (): Promise<Users[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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

const userService = {
    getAllUsers
};

export default userService;
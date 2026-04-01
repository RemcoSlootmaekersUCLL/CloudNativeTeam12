import { Users } from "@/types";

interface LoginResponse {
  id: string;
  message: string;
  username: string;
}

const getAllUsers = async (): Promise<Users[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
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

const loginUser = async (username: string, password: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
    );

    if (response.status === 400) {
      throw new Error(await response.text());
    }

    const data: LoginResponse = await response.json();

    if (!response.ok) {
      return { message: data || "Login failed" };
    }
    localStorage.setItem("username", data.username);
    localStorage.setItem("id", data.id);
    return data;

  } catch (error: any) {
    return { message: error.message };
  }
};

const deleteUser = async (id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
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

const registerUser = async (user: Users) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    },
  );

  if (!response.ok) {
    throw new Error('Er is iets mis gegaan.');
  }

  return true;
};

const getUserById = async (id: string): Promise<Users> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
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

const userService = {
  getAllUsers,
  loginUser,
  deleteUser,
  registerUser,
  getUserById
};

export default userService;

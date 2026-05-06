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
    throw new Error("Could not fetch goals");
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

  // all this work just to show en error is insane.
  if (!response.ok) {
    const text = await response.text();
    let message = text;
    const match = text.match(/"error"\s*:\s*"(.+)/i);
    if (match) {
      message = match[1];
    }

    message = message
      .replace(/^JSON parse error:\s*/i, "")
      .replace(/["}]+$/, "")
      .trim();

    throw new Error(message);
  }

  return response.json();
};

const editGoal = async (goal: Goals, id: string): Promise<Goals[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(goal),
    },
  );

  if (!response.ok) {
    throw new Error("Could not edit goal");
  }

  return response.json();
};

const getGoal = async (id: string): Promise<Goals> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch goal");
  }

  return response.json();
};

const deleteGoal = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/goals/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Could not delete goal");
  }

  return true;
};

const getGoalsFromUser = async (userId: string): Promise<Goals[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/goals/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch goals from user");
  }

  return response.json();
};

const goalService = {
  getAllGoals,
  editGoal,
  getGoal,
  addGoal,
  deleteGoal,
  getGoalsFromUser,
};

export default goalService;

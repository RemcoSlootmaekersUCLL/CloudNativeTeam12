export type Exercises = {
  id: number;
  name: string;
  type: string;
};

export type Workouts = {
  id: number;
  userId: number;
  date: number;
  exercises: Exercises[];
};

export type Users = {
  id: number;
  username: string;
  password: string;
  age: number;
  weight: number;
  height: number;
};

export type Goals = {
  name: string;
  startDate: string;
  endDate: string;
  wasSuccessful: boolean;
  userId: string;
};

export type StatusMessage = {
  message: string;
  type: "success" | "error";
};
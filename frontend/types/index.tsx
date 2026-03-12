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
  id: number;
  name: string;
  startDate: number;
  endDate: number;
  wasSuccesful: boolean;
  userId: number;
};

export type StatusMessage = {
  message: string;
  type: "succes" | "error";
};

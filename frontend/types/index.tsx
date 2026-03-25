export type Exercises = {
  id: number;
  name: string;
  type: string;
};

export type Workouts = {
  id: string;
  userId: string;
  date: string;
  exercises: Exercises[];
};

export type WorkoutExercise = {
  exerciseId: string;
  reps: number;
  duration: number;
  caloriesBurned: number;
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
  id: string;
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


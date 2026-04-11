export type Exercises = {
  id?: string;
  name: string;
  type: string;
  reps?: number;
  duration?: number;
  caloriesBurned?: number;
};

export type Workouts = {
  id: string;
  userId: string;
  date: string;
  exercises: Exercises[];
  totalCaloriesBurned?: number;
};

export type WorkoutExercise = {
  exerciseId: string;
  reps: number;
  duration: number;
  caloriesBurned: number;
};

export type Users = {
  id?: string;
  username: string;
  password: string;
  age: number;
  weight: number;
  height: number;
  bmi?: number;
};

// export type Users = {
//   [x: string]: Users;
//   id?: string;
//   username: string;
//   password: string;
//   age: number;
//   weight: number;
//   height: number;
//   bmi?: number;
// };

export type Goals = {
  id?: string;
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

"use client";

import { useRouter } from "next/navigation";

type Props = {
  userId: string;
};

const CreateWorkoutButton: React.FC<Props> = (userId: Props) => {
  const router = useRouter();

  return (
    <span>
      <button
        className="p-2 border border-slate-400 rounded-lg bg-gradient-to-br from-blue-500 to-sky-700"
        onClick={() => router.push(`/workouts/${userId}/create`)}
      >
        New Workout
      </button>
    </span>
  );
};

export default CreateWorkoutButton;

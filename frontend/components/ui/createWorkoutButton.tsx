"use client";

import { useRouter } from "next/navigation";

type Props = {
  userId: string;
};

const CreateWorkoutButton: React.FC<Props> = ({ userId }: Props) => {
  const router = useRouter();

  const loggedInUserId = sessionStorage.getItem("id");

  return (
    loggedInUserId &&
    (loggedInUserId === userId ? (
      <span>
        <button
          className="p-2 border border-slate-400 rounded-lg bg-gradient-to-br from-blue-500 to-sky-700"
          onClick={() => router.push(`/workouts/${loggedInUserId}/create`)}
        >
          New Workout
        </button>
      </span>
    ) : (
      <></>
    ))
  );
};

export default CreateWorkoutButton;

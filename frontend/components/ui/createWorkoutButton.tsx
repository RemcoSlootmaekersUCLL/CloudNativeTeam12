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
          className="justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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

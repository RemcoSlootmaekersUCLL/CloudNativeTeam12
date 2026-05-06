"use client";

import goalService from "@/services/goalService";
import { Goals, StatusMessage } from "@/types";
import Link from "next/link";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  goalId: string;
};

const DeleteGoal: React.FC<Props> = ({ goalId }) => {
  const router = useRouter();
  const [goal, setGoal] = useState<Goals | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const fetchedGoal = await goalService.getGoal(goalId);
        if (!fetchedGoal) {
          setFetchError("Goal not found");
          return;
        }
        setGoal(fetchedGoal);
      } catch (error) {
        setFetchError((error as Error).message);
      }
    };

    fetchGoal();
  }, [goalId]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setStatusMessages([]);

    try {
      const response = await goalService.deleteGoal(goalId);
      if (!response) {
        console.log("API returned error");
        return;
      }
      setStatusMessages([
        { message: "Goal successfully deleted.", type: "success" },
      ]);
      setTimeout(() => {
        router.push("/goals");
      }, 1000);
    } catch (error) {
      setStatusMessages([{ message: (error as Error).message, type: "error" }]);
    }
  };

  if (fetchError) return <div>Error: {fetchError}</div>;
  if (!goal) return <div>Loading...</div>;

  return (
    <div className="max-w-sm m-auto">
      {statusMessages.length > 0 && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto text-center">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <h1 className="text-center font-bold p-4">Delete goal.</h1>
        <div className="flex gap-x-1 mt-2 justify-center">
          <h1>Are you sure you want to delete goal {goal.name}?</h1>
        </div>
        <div className="flex gap-x-1 mt-2 justify-center">
          <Link
            href={`/profile/${sessionStorage.getItem("id")}`}
            className="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Cancel
          </Link>
          <button
            className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Delete goal
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeleteGoal;

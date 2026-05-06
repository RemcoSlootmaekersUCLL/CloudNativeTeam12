"use client";

import goalService from "@/services/goalService";
import { StatusMessage } from "@/types";
import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";

type props = {
  goalId: string;
};

const DeleteGoal: React.FC<props> = ({ goalId }) => {
  const router = useRouter();

  const [statusMessages, setStatusMessage] = useState<StatusMessage[]>([]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    setStatusMessage([]);

    try {
      const response = await goalService.deleteGoal(goalId);
      if (!response) {
        console.log("API returned error");
        return;
      }
      setStatusMessage([
        { message: "Goal succesfully deleted.", type: "success" },
      ]);
      setTimeout(() => {
        router.push("/goals");
      }, 1000);
    } catch (error) {
      setStatusMessage([{ message: (error as Error).message, type: "error" }]);
    }
  };
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
        <div className="flex gap-x-1 mt-2 justify-center">
          <h1>Are you sure you want to delete goal {goalId}</h1>
        </div>
        <div className="flex gap-x-1 mt-2 justify-center">
          <Link
            href={`/profile/${sessionStorage.getItem("id")}`}
            className="redButton"
          >
            Cancel
          </Link>
          <button
            className="button"
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

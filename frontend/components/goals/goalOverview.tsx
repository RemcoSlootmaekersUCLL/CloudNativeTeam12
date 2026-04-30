"use client";

import { Goals } from "@/types";
import Link from "next/link";
import { useState } from "react";

type Props = {
  goals: Goals[];
  userIds: string[];
};

const GoalOverview: React.FC<Props> = ({ goals, userIds }) => {
  const [userIdError, setUserIdError] = useState<string | null>(null);

  return (
    <>
      {userIdError && (
        <p className="text-red-600 text-sm mt-1 pb-2">{userIdError}</p>
      )}
      {goals && (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">StartDate</th>
              <th className="border border-gray-300 px-4 py-2">EndDate</th>
              <th className="border border-gray-300 px-4 py-2">
                WasSuccessful
              </th>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Options</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((g, i) => (
              <tr key={i} className="">
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {g.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {g.startDate}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {g.endDate}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {g.wasSuccessful ? "yes" : "no"}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {g.userId}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  <Link
                    href={`/goals/edit/${g.id}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    edit goal
                  </Link>
                  <Link
                    href={`/goals/delete/${g.id}`}
                    className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    delete goal
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default GoalOverview;

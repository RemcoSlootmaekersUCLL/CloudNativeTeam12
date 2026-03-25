'use client'

import { Goals } from "@/types";
import Link from "next/link";
import { useState } from "react";

type Props = {
    goals: Goals[];
    userIds: string[];
};

const GoalOverview: React.FC<Props> = ({ goals, userIds }) => {
    const [userId, setUserId] = useState("");
    const [userIdError, setUserIdError] = useState<string | null>(null);

    return (
        <>
            <div className="flex items-center gap-2 mb-4 justify-center">
                <input
                    id="wasSuccessful"
                    type="text"
                    value={userId}
                    placeholder="UserId"
                    onChange={(event) => setUserId(event.target.value)}
                    className="border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                <Link href={`/goals/create/${userId}`} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={(e) => {
                        if (!userIds.includes(userId)) {
                            e.preventDefault();
                            setUserIdError("Please enter a valid existing User ID.");
                        } else {
                            setUserIdError(null);
                        }
                    }}>Create goal</Link>
            </div>
            {userIdError && (
                <p className="text-red-600 text-sm mt-1 pb-2">{userIdError}</p>
            )}
            {goals && (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">name</th>
                            <th className="border border-gray-300 px-4 py-2">startDate</th>
                            <th className="border border-gray-300 px-4 py-2">endDate</th>
                            <th className="border border-gray-300 px-4 py-2">wasSuccessful</th>
                            <th className="border border-gray-300 px-4 py-2">userId</th>
                            <th className="border border-gray-300 px-4 py-2">options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals.map((g, i) => (
                            <tr key={i} className="">
                                <td className="border border-gray-300 px-4 py-2 text-right">{g.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{g.startDate}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{g.endDate}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{g.wasSuccessful ? "yes" : "no"}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">{g.userId}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">
                                    <Link href={`/goals/edit/${g.id}`} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">edit goal</Link>
                                    <Link href={`/goals/delete/${g.id}`} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">delete goal</Link>
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
"use client";

import { Workouts } from "@/types";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
    workouts: Workouts[];
};


const WorkoutOverview: React.FC<Props> = ({ workouts }) => {
    const router = useRouter();

    return (
        <>
            {workouts && (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">userId</th>
                            <th className="border border-gray-300 px-4 py-2">date</th>
                            <th className="border border-gray-300 px-4 py-2">exercises</th>
                            <th className="border border-gray-300 px-4 py-2">options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((w, i) => (
                            <tr key={i}>
                                <td className="border border-gray-300 px-4 py-2 text-right">{w.userId}</td>
                                <td className="border border-gray-300 px-4 py-2">{w.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{w.exercises.map((exercise, index) => (
                                    <div key={index}>
                                        {exercise.name}, {exercise.type}
                                    </div>
                                ))}</td>
                                <td>
                                    <Link href={`/workouts/${w.userId}`} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">all workouts of user</Link>
                                    <Link href={`/workouts/delete/${w.id}`} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">delete workout</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default WorkoutOverview;
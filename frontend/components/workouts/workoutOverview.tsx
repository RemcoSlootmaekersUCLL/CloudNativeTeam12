"use client";

import { Workouts } from "@/types";
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
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((w, i) => (
                            <tr key={i} className="hover:bg-yellow-600 cursor-pointer" onClick={() => router.push(`/workouts/${w.userId}`)}>
                                <td className="border border-gray-300 px-4 py-2 text-right">{w.userId}</td>
                                <td className="border border-gray-300 px-4 py-2">{w.date}</td>
                                <td className="border border-gray-300 px-4 py-2">{w.exercises.map((exercise, index) => (
                                    <div key={index}>
                                        {exercise.name}, {exercise.type}
                                    </div>
                                ))}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default WorkoutOverview;
import { Goals, Users, Workouts } from "@/types";
import Link from "next/link";

type Props = {
    user: Users;
    workouts: Workouts[];
    goals: Goals[];
};

const ProfileOverview: React.FC<Props> = ({ user, workouts, goals }) => {
    return (
        <>
            <h2 className="justify-center flex font-bold">User information</h2>
            {user && (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">userId</th>
                            <th className="border border-gray-300 px-4 py-2">username</th>
                            <th className="border border-gray-300 px-4 py-2">password</th>
                            <th className="border border-gray-300 px-4 py-2">age</th>
                            <th className="border border-gray-300 px-4 py-2">weight</th>
                            <th className="border border-gray-300 px-4 py-2">height</th>
                            <th className="border border-gray-300 px-4 py-2">BMI</th>
                            <th className="border border-gray-300 px-4 py-2">options</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="">
                            <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                                {user.username}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {user.password}
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                                {user.age}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{user.weight}</td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                                {user.height}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{user.bmi}</td>

                            <td>
                                <Link href={`/users/delete/${user.id}`} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">delete user</Link>
                            </td>
                        </tr>
                    </tbody>
                </table >
            )}

            <h2 className="justify-center flex font-bold mt-20">Your workouts</h2>
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
                            <tr key={i} className="">
                                <td className="border border-gray-300 px-4 py-2 text-right">
                                    {w.userId}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{w.date}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {w.exercises.map((exercise, index) => (
                                        <div key={index}>
                                            {exercise.name}, {exercise.type}
                                        </div>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h2 className="justify-center flex font-bold mt-20">Your goals</h2>
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

export default ProfileOverview;

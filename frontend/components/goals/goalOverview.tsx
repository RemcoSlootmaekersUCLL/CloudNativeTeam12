import { Goals } from "@/types";
import Link from "next/link";

type Props = {
    goals: Goals[];
};

const GoalOverview: React.FC<Props> = ({ goals }) => {
    return (
        <>
            {goals && (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">name</th>
                            <th className="border border-gray-300 px-4 py-2">startDate</th>
                            <th className="border border-gray-300 px-4 py-2">endDate</th>
                            <th className="border border-gray-300 px-4 py-2">wasSuccesful</th>
                            <th className="border border-gray-300 px-4 py-2">userId</th>
                            <th className="border border-gray-300 px-4 py-2">edit</th>
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
                                    <Link href={`/goals/${g.id}`} className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">edit goal</Link>
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
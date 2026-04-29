import { Exercises } from "@/types";
import Link from "next/link";

type Props = {
    exercises: Exercises[];
};


const ExerciseOverview: React.FC<Props> = ({ exercises }) => {
    return (
        <>
            <div className="flex justify-center my-4">
                <Link href={`/exercises/create`} className="justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create exercise</Link>
            </div>
            {exercises && (
                <table className="mx-auto min-w-200 border-collapse border border-gray-300">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 max-w-20">Name</th>
                            <th className="border border-gray-300 px-4 py-2 max-w-20">Type</th>
                            <th className="border border-gray-300 px-4 py-2 max-w-20">Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((e, i) => (
                            <tr key={i} className="">
                                <td className="border border-gray-300 px-4 py-2 max-w-20 text-left">{e.name}</td>
                                <td className="border border-gray-300 px-4 py-2 max-w-20 text-left">{e.type}</td>
                                <td className="text-center max-w-20">
                                    <Link href={`/exercises/delete/${e.id}`} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">delete exercise</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ExerciseOverview;
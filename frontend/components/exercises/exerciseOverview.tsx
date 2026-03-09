import { Exercises } from "@/types";

type Props = {
    exercises: Exercises[];
};


const ExerciseOverview: React.FC<Props> = ({ exercises }) => {
    return (
        <>
            {exercises && (
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-black-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">name</th>
                            <th className="border border-gray-300 px-4 py-2">type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((e, i) => (
                            <tr key={i} className="">
                                <td className="border border-gray-300 px-4 py-2 text-right">{e.name}</td>
                                <td className="border border-gray-300 px-4 py-2">{e.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
};

export default ExerciseOverview;
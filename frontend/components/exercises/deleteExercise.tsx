'use client'

import { StatusMessage } from "@/types";
import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";
import exerciseService from "@/services/exerciseService";

type props = {
    exerciseId: string;
}

const DeleteExercise: React.FC<props> = ({ exerciseId }) => {
    const router = useRouter();


    const [statusMessages, setStatusMessage] = useState<StatusMessage[]>([]);


    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();


        setStatusMessage([])

        try {
            const response = await exerciseService.deleteExercise(exerciseId);
            if (!response) {
                console.log("API returned error");
                return;
            }
            setStatusMessage([{ message: "Exercise succesfully deleted.", type: "success" }])
            setTimeout(() => {
                router.push("/exercises");
            }, 1000);
        } catch (error) {
            setStatusMessage([{ message: (error as Error).message, type: "error" }])
        }
    };
    return (
        <div className="max-w-sm m-auto">
            {statusMessages.length > 0 && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto text-center">
                        {statusMessages.map(({ message, type }, index) => (
                            <li key={index} className={classNames({
                                'text-red-800': type === 'error',
                                'text-green-800': type === 'success',
                            })}>
                                {message}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="flex gap-x-1 mt-2 justify-center">
                    <h1>Are you sure you want to delete exercise {exerciseId}</h1>
                </div>
                <div className="flex gap-x-1 mt-2 justify-center">
                    <Link href={`/exercises`} className="text-white bg-gray-700 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Cancel
                    </Link>
                    <button
                        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit">
                        Delete exercise.
                    </button>
                </div>
            </form>
        </div>
    );

};


export default DeleteExercise;
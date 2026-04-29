'use client'

import { StatusMessage } from "@/types";
import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";
import exerciseService from "@/services/exerciseService";

const CreateExercise: React.FC = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);

    const [type, setType] = useState("");
    const [typeError, setTypeError] = useState<string | null>(null);


    const [statusMessages, setStatusMessage] = useState<StatusMessage[]>([]);


    const validate = (name: string, type: string): boolean => {
        setNameError(null);
        setTypeError(null);
        let isValid = true;

        if (!name.trim()) {
            setNameError("Name is manditory.");
            isValid = false;
        }

        if (!type.trim()) {
            setTypeError("Please select a type.");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (!validate(name, type)) {
            return;
        }

        setStatusMessage([])

        const exerciseToAdd = {
            name,
            type
        };

        try {
            const response = await exerciseService.addExercise(exerciseToAdd);
            if (!response) {
                console.log("API returned error");
                return;
            }
            setStatusMessage([{ message: "Exercise succesfully added.", type: "success" }])
            setTimeout(() => {
                router.push("/exercises");
            }, 1000);
        } catch (error) {
            setStatusMessage([{ message: (error as Error).message, type: "error" }])
        }
    };
    return (
        <div className="max-w-sm m-auto p-3 border-3 border-black   bg-gray-400 rounded-3xl">
            {statusMessages.length > 0 && (
                <div className="row">
                    <ul className="list-none mb-3 mx-auto">
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
                <div>
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium">
                            Name:
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium bg-[#393b3d] rounded-lg">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            placeholder="Your exercise"
                            onChange={(event) => setName(event.target.value)}
                            className="border border-gray-300 rounded-lg block w-full p-2.5 text-white appearance-none placeholder-white" />
                        {nameError && <p className="text-red-600 text-sm mt-1">{nameError}</p>}
                    </div>
                </div>
                <div className="mt-2">
                    <div>
                        <label
                            htmlFor="type"
                            className="block mb-2 text-sm font-medium">
                            Type:
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium bg-[#393b3d] rounded-lg">
                        <select
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="border border-gray-300 rounded-lg block w-full p-2.5 text-white appearance-none"
                        >
                            <option value="" className="bg-[#393b3d] text-white">Select a type</option>
                            <option value="STRENGTH" className="bg-[#393b3d] text-white">Strength</option>
                            <option value="CARDIO" className="bg-[#393b3d] text-white">Cardio</option>
                        </select>
                        {typeError && <p className="text-red-600 text-sm mt-1">{typeError}</p>}
                    </div>
                </div>
                <div className="flex gap-x-1 mt-2">
                    <Link href={`/exercises`} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Cancel
                    </Link>

                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit">
                        Create exercise.
                    </button>
                </div>
            </form>
        </div>
    );

};


export default CreateExercise;
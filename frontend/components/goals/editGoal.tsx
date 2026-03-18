'use client'

import goalService from "@/services/goalService";
import { Goals, StatusMessage } from "@/types";
import Link from "next/link";
import classNames from "classnames";
import { useState } from "react";
import { useRouter } from "next/navigation";

type props = {
    goalId: string;
    goal: Goals;
}

const EditGoal: React.FC<props> = ({ goalId, goal }) => {
    const router = useRouter();

    const [name, setName] = useState(goal.name);
    const [nameError, setNameError] = useState<string | null>(null);

    const [startDate, setStartDate] = useState(goal.startDate);
    const [startDateError, setStartDateError] = useState<string | null>(null);

    const [endDate, setEndDate] = useState(goal.endDate);
    const [endDateError, setEndDateError] = useState<string | null>(null);

    const [wasSuccessful, setWasSuccessful] = useState<boolean>(goal.wasSuccessful ?? false);


    const [statusMessages, setStatusMessage] = useState<StatusMessage[]>([]);


    const validate = (name: string, startDate: string, endDate: string): boolean => {
        setNameError(null);
        setStartDateError(null);
        setEndDateError(null);
        let isValid = true;

        if (!name.trim()) {
            setNameError("Name is manditory.");
            isValid = false;
        }

        const timeRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!timeRegex.test(startDate)) {
            setStartDateError("StartDate is manditory.");
            isValid = false;
        }
        if (!timeRegex.test(endDate)) {
            setEndDateError("EndDate is manditory.");
            isValid = false;
        }


        return isValid;
    };

    const handleSubmit = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (!validate(name, startDate, endDate)) {
            return;
        }

        setStatusMessage([])

        const userId = goal.userId
        const id = goal.id


        const goalToEdit = {
            id,
            name,
            startDate,
            endDate,
            wasSuccessful,
            userId
        };

        try {
            const response = await goalService.editGoal(goalToEdit, goalId);
            if (!response) {
                console.log("API returned error");
                return;
            }
            setStatusMessage([{ message: "Goal succesfully added.", type: "success" }])
            setTimeout(() => {
                router.push("/goals");
            }, 1000);
        } catch (error) {
            setStatusMessage([{ message: (error as Error).message, type: "error" }])
        }
    };
    return (
        <div className="max-w-sm m-auto">
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
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="name"
                            type="text"
                            value={name}
                            placeholder="Your goal"
                            onChange={(event) => setName(event.target.value)}
                            className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5" />
                        {nameError && <p className="text-red-600 text-sm mt-1">{nameError}</p>}
                    </div>
                </div>
                <div className="mt-2">
                    <div>
                        <label
                            htmlFor="startdate"
                            className="block mb-2 text-sm font-medium">
                            Start date:
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="startdate"
                            type="text"
                            value={startDate}
                            placeholder="YYYY-MM-DD"
                            onChange={(event) => setStartDate(event.target.value)}
                            className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5" />
                        {startDateError && <p className="text-red-600 text-sm mt-1">{startDateError}</p>}
                    </div>
                </div>
                <div className="mt-2">
                    <div>
                        <label
                            htmlFor="enddate"
                            className="block mb-2 text-sm font-medium">
                            End date:
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="enddate"
                            type="text"
                            value={endDate}
                            placeholder="YYYY-MM-DD"
                            onChange={(event) => setEndDate(event.target.value)}
                            className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5" />
                        {endDateError && <p className="text-red-600 text-sm mt-1">{endDateError}</p>}
                    </div>
                </div>
                <div className="mt-2">
                    <div>
                        <label
                            htmlFor="wasSuccessful"
                            className="block mb-2 text-sm font-medium">
                            Was succesful:
                        </label>
                    </div>
                    <div className="block mb-2 text-sm font-medium">
                        <input
                            id="wasSuccessful"
                            type="checkbox"
                            checked={wasSuccessful}
                            onChange={(event) => setWasSuccessful(event.target.checked)}
                            className="w-5 h-5 accent-blue-500 rounded-lg" />
                    </div>
                </div>
                <div className="flex gap-x-1 mt-2">
                    <Link href={`/goals`} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Cancel
                    </Link>

                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        type="submit">
                        Edit goal.
                    </button>
                </div>
            </form>
        </div>
    );

};


export default EditGoal;
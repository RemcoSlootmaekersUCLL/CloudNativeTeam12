"use client";
import { useState } from "react";
import userService from "@/services/userService";
import { StatusMessage } from "@/types";
import classNames from "classnames";
import { useRouter } from "next/navigation";

type Props = {
    usernames: string[];
}
const RegisterForm: React.FC<Props> = ({ usernames }) => {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState(0);
    const [height, setHeight] = useState(0);
    const [loginErrorMessage, setLoginErrroMessage] = useState("");
    const [usernameError, setUsernameError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [ageError, setAgeError] = useState<string | null>(null);
    const [weightError, setWeightError] = useState<string | null>(null);
    const [heightError, setHeightError] = useState<string | null>(null);
    const [statusMessages, setStatusMessage] = useState<StatusMessage[]>([]);


    const validate = (): boolean => {
        let result = true;
        if (username.trim() === "") {
            setUsernameError("Username cannot be empty");
            result = false;
        }
        // for (const existingusername of usernames) {
        //     if (username == existingusername) {
        //         setUsernameError("Username already in use");
        //         result = false;
        //     }
        // }
        if (password.trim() === "") {
            setPasswordError("password cannot be empty");
            result = false;
        }
        if (age == 0) {
            setAgeError("age must be positive and larger than 0");
            result = false;
        }
        if (weight == 0) {
            setWeightError("weight must be positive and larger than 0");
            result = false;
        }
        if (height == 0) {
            setHeightError("height must be positive and larger than 0");
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoginErrroMessage("");

        if (!validate()) return;
        const newUser = {
            username,
            password,
            age,
            weight,
            height
        }
        try {
            const response = await userService.registerUser(newUser);
            if (!response) {
                console.log("API returned error");
                return;
            }
            setStatusMessage([{ message: "User succesfully registered.", type: "success" }])
            setTimeout(() => {
                router.push("/login");
            }, 1000);
        } catch (error) {
            setLoginErrroMessage("error");
            console.log(error);
            setStatusMessage([{ message: (error as Error).message, type: "error" }])

        }
    };

    return (
        <div className="bg-inherit">
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
            <div className="flex justify-center items-center pt-8 pb-10 text-white">
                <div className="w-full max-w-xs">
                    <h2 className="m-0 mb-6 text-[22px] font-semibold text-white">
                        REGISTER
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <label className="block text-[13px] text-gray-600 mb-1">
                            Username
                        </label>
                        <input
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            className="w-full px-3 py-[9px] rounded-md border border-gray-300 text-sm mb-4 box-border outline-none focus:border-gray-400"
                        />
                        {usernameError && <p className="text-red-600 text-sm mt-1">{usernameError}</p>}
                        <label className="block text-[13px] text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Admin123"
                            className="w-full px-3 py-[9px] rounded-md border border-gray-300 text-sm mb-2 box-border outline-none focus:border-gray-400"
                        />
                        {passwordError && <p className="text-red-600 text-sm mt-1">{passwordError}</p>}
                        <div>
                            <label
                                htmlFor="age"
                                className="block mb-2 text-sm font-medium">
                                Age
                            </label>
                        </div>
                        <div className="block mb-2 text-sm font-medium">
                            <input
                                id="age"
                                type="number"
                                value={age}
                                placeholder="Your goal"
                                onChange={(event) => setAge(Number(event.target.value))}
                                className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5" />
                            {ageError && <p className="text-red-600 text-sm mt-1">{ageError}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="weight"
                                className="block mb-2 text-sm font-medium">
                                Weight
                            </label>
                        </div>
                        <div className="block mb-2 text-sm font-medium">
                            <input
                                id="weight"
                                type="number"
                                value={weight}
                                placeholder="Your goal"
                                onChange={(event) => setWeight(Number(event.target.value))}
                                className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5" />
                            {weightError && <p className="text-red-600 text-sm mt-1">{weightError}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="height"
                                className="block mb-2 text-sm font-medium">
                                Height
                            </label>
                        </div>
                        <div className="block mb-2 text-sm font-medium">
                            <input
                                id="height"
                                type="number"
                                value={height}
                                placeholder="Your goal"
                                onChange={(event) => setHeight(Number(event.target.value))}
                                className="border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5" />
                            {heightError && <p className="text-red-600 text-sm mt-1">{heightError}</p>}
                        </div>
                        <button
                            className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                            type="submit"
                        >
                            register
                        </button>
                        <div>{loginErrorMessage}</div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default RegisterForm;
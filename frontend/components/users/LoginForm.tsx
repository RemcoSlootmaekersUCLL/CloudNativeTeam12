"use client";
import { useState } from "react";
import userService from "@/services/userService";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrroMessage] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateLogin = (): boolean => {
    let result = true;
    if (username.trim() === "") {
      setUsernameError("Username cannot be empty");
      result = false;
    }
    if (password.trim() === "") {
      setPasswordError("password cannot be empty");
      result = false;
    }
    return result;
  };

  const handleLoginUser = (event: React.FormEvent) => {
    event.preventDefault();
    setLoginErrroMessage("");

    if (!validateLogin()) return;

    try {
      userService.loginUser(username, password);
    } catch (error) {
      setLoginErrroMessage("error");
      console.log(error);
    }
  };

  return (
    <div className="bg-inherit">
      <div className="flex justify-center items-center h-screen text-white">
        <div className="w-full max-w-xs">
          <h2 className="m-0 mb-6 text-[22px] font-semibold text-white">
            LOGIN
          </h2>
          <form onSubmit={handleLoginUser}>
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
            {usernameError}
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
            {passwordError}
            <button
              className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
              type="submit"
            >
              log in
            </button>
            <div>IronMan88 : securePass123</div>
            <div>CardioQueen : runFast99</div>
            <div>{loginErrorMessage}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

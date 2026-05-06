"use client";
import { useState } from "react";
import userService from "@/services/userService";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErrorMessage, setLoginErrroMessage] = useState("");
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const validateLogin = (): boolean => {
    let result = true;
    if (username.trim() === "") {
      setUsernameError("Username cannot be empty");
      result = false;
    }
    if (password.trim() === "") {
      setPasswordError("Password cannot be empty");
      result = false;
    }
    return result;
  };

  const handleLoginUser = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginErrroMessage("");
    setUsernameError(null);
    setPasswordError(null);

    if (!validateLogin()) return;

    const result = await userService.loginUser(username, password);

    if (!result || !("username" in result)) {
      setLoginErrroMessage((result as any)?.message ?? "Something went wrong");
      return;
    }
    sessionStorage.setItem("username", username);
    window.dispatchEvent(new Event("session-change"));
    router.push(`/profile/${result.id}`);
  };

  return (
    <div className="bg-inherit">
      <div className="flex justify-center items-center pt-8 pb-10 text-black">
        <div className="w-full max-w-xs">
          <h2 className="m-0 mb-6 text-[22px] font-semibold">LOGIN</h2>
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
            <div>{loginErrorMessage}</div>
          </form>
          <Link
            href="/login/register"
            className="block mt-5 w-full text-white bg-emerald-600 hover:bg-emerald-800 rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Register user
          </Link>
        </div>
      </div>
    </div>
  );
}

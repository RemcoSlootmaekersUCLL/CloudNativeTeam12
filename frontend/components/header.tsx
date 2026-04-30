"use client";

import userService from "@/services/userService";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const links = [
    { dest: "Home", uri: "/" },
    { dest: "Exercises", uri: "/exercises" },
    
    { dest: "Workouts", uri: "/workouts" },
    ...(loggedIn
      ? [{ dest: "Profile", uri: `/profile/${sessionStorage.getItem("id")}` }]
      : []),
  ];

  useEffect(() => {
    const sync = () => {
      const username = sessionStorage.getItem("username");
      setLoggedIn(!!username);
      setLoading(false);
    };

    sync();
    window.addEventListener("session-change", sync);
    return () => window.removeEventListener("session-change", sync);
  }, []);

  const handleLogout = () => {
    userService.logout();
    window.dispatchEvent(new Event("session-change"));
  };

  const linkClassname =
    "mx-2 px-2 py-1 text-black rounded-lg hover:bg-gray-800/20 transition-colors duration-300 font-family-plus-jakarta-sans";

  return (
    <div className="bg-mist-300">
      <div className="ml-40 mr-40 ">
        <header className="w-full to-lime-400 py-1">
          <div className="flex flex-row items-center justify-between">
            <div className="p-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r text-transparent bg-clip-text from-black to-gray-400">
                <Link href="/">Fitness tracker</Link>
              </h1>
            </div>

            <nav className="flex text-xl" aria-label="main">
              {loggedIn && links.map((link) => (
                <Link key={link.dest} href={link.uri} className={linkClassname}>
                  {link.dest}
                </Link>
              ))}
            </nav>
            <div className="w-40 flex justify-end">
              <nav className="text-xl w-24" aria-label="auth">
                {loggedIn ? (
                  <Link
                    className={linkClassname}
                    href="/login"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                ) : (
                  <Link className={linkClassname} href="/login">
                    Login
                  </Link>
                )}
              </nav>
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;

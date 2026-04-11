"use client";

import userService from "@/services/userService";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const links = [
    { dest: "Home", uri: "/" },
    ...(loggedIn ? [] : [{ dest: "Users", uri: "/users" }]),
    { dest: "Exercises", uri: "/exercises" },
    { dest: "Workouts", uri: "/workouts" },
    ...(loggedIn ? [] : [{ dest: "Goals", uri: "/goals" }]),
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
    "mx-2 px-2 py-1 text-yellow-50 rounded-lg hover:bg-cyan-300/30 transition-colors duration-300";

  return (
    <header className="w-full bg-gradient-to-r from-emerald-600 to-lime-400 py-1">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl self-center font-bold bg-gradient-to-r text-transparent bg-clip-text from-blue-100 to-sky-200">
          <Link href="/">Fitness tracker</Link>
        </h1>
        <div className="md:flex md:just-between md:mx-auto">
          <nav
            className="space-x-8 text-xl flex md:mx-auto md:space-x-0"
            aria-label="main"
          >
            {links.map((link) => (
              <Link key={link.dest} href={link.uri} className={linkClassname}>
                {link.dest}
              </Link>
            ))}
            {!loading &&
              (loggedIn ? (
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
              ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

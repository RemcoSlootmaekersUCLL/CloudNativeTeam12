"use client";

import Link from "next/link";

const Header: React.FC = () => {
  const links = [
    { dest: "Home", uri: "/" },
    { dest: "Users", uri: "/users" },
    { dest: "Exercises", uri: "/exercises" },
    { dest: "Workouts", uri: "/workouts" },
    { dest: "Goals", uri: "/goals" },
    { dest: "Login", uri: "/login" },
  ];

  const linkClassname =
    "mx-2 px-2 py-1 text-yellow-50 rounded-lg hover:bg-pink-200 hover:text-black transition-colors duration-300";

  return (
    <header className="w-full bg-gradient-to-r from-green-600 to-emerald-600 py-1">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl self-center font-bold bg-gradient-to-r text-transparent bg-clip-text from-blue-300 via-sky-100 to-blue-300">
          <Link href="/">Fitness tracker</Link>
        </h1>
        <div className="md:flex md:just-between md:mx-auto">
          <nav
            className="space-x-8 text-xl flex md:mx-auto md:space-x-0"
            aria-label="main"
          >
            {links.map((link) => (
              <Link href={link.uri} className={linkClassname}>
                {link.dest}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

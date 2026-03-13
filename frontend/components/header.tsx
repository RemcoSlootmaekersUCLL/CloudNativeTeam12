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
    "px-4 py-1 text-yellow-50 rounded-lg hover:bg-yellow-600 hover:text-white transition-colors";

  return (
    <header className="w-full md:items-center bg-gradient-to-br from-yellow-300 via-amber-500 to-orange-700 border-b">
      <section className="flex justify-between flex-col w-full p-4 text-center">
        <h1 className="text-3xl font-bold text-orange-900">
          <a href="/">Fitness tracker</a>
        </h1>
        <div className="md:flex md:just-between md:mx-auto ">
          <nav
            className="space-x-8 text-xl flex md:mr-auto md:ml-auto md:space-x-0"
            aria-label="main"
          >
            {links.map((link) => (
              <Link href={link.uri} className={linkClassname}>
                {link.dest}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </header>
  );
};

export default Header;

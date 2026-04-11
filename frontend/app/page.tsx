import Link from "next/link";

export const metadata = {
  title: "Home - Fitness tracker",
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="flex border-b border-gray-100">
        <section className="py-20 px-8 ml-43">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">
            Your personal fitness companion
          </p>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-black to-gray-400 text-transparent bg-clip-text">
            Track your fitness activities.
          </h1>
          <p className="text-lg text-gray-500 max-w-xl">
            Welcome to your personal fitness tracker — built for beginners and
            athletes alike.
          </p>
        </section>
        <div className="m-5 mr-40">
          <img src="/img/dude_in_the_gym.avif" alt="Person in the gym" />
        </div>
      </div>

      <div className="flex justify-around">
        <section className="py-16 px-8 max-w-3xl">
          <span className="inline-block bg-black text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
            Get Started
          </span>
          <h2 className="text-3xl font-bold mb-4">Your journey starts here.</h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Log your workouts, monitor your progress, and set fitness goals —
            all in one place. Whether you're just starting out or pushing your
            limits, our intuitive interface keeps you on track. Create an
            account to begin your fitness journey today.
          </p>
        </section>

        <section className="py-20 px-8 text-center mr-20">
          <h2 className="text-3xl font-bold mb-4">Ready to get moving?</h2>
          <p className="text-gray-500 mb-8">
            Join and start logging your first workout today.
          </p>
          <Link
            href="/login"
            className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Get Started →
          </Link>
        </section>
      </div>
    </div>
  );
};
export default Home;

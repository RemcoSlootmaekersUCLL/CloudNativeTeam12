import Header from "@/components/header";

export const metadata = {
  title: "Home - Fitness tracker",
};

const Home = () => {
  return (
    <div className="text-center">
      <Header></Header>
      <h1 className="text-center font-bold p-4">
        Track your fitness activities.
      </h1>
    </div>
  );
};

export default Home;

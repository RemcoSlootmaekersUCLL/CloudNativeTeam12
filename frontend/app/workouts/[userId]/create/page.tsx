import Header from "@/components/header";
import CreateWorkout from "@/components/workouts/createWorkout";

const createWorkoutPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="flex justify-center mt-2">
        <div>
          <h1 className="font-xl font-bold text-2xl">New Workout</h1>
          <CreateWorkout />
        </div>
      </div>
    </>
  );
};

export default createWorkoutPage;

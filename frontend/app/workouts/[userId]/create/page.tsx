import CreateWorkout from "@/components/workouts/createWorkout";

const createWorkoutPage: React.FC = () => {
  return (
    <>
      <div className="flex justify-center">
        <div>
          <h1 className="font-xl font-bold text-2xl text-center py-2">New Workout</h1>
          <CreateWorkout />
        </div>
      </div>
    </>
  );
};

export default createWorkoutPage;

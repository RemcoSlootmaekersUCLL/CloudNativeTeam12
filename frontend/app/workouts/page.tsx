import workoutService from "@/services/workoutService";
import WorkoutOverview from "@/components/workouts/workoutOverview";
import userService from "@/services/userService";

const getData = async () => {
  try {
    const workouts = await workoutService.getAllWorkouts();
    const users = await userService.getAllUsers();
    return { workouts: workouts,users:users, error: null };
  } catch (error) {
    return { workouts: null,users:null, error: (error as Error).message };
  }
};

export const metadata = {
  title: "Workouts - Fitness tracker",
};

const WorkoutPage: React.FC = async () => {
  const { workouts,users, error } = await getData();

  return (
    <div>
      <main>
        <h1 className="text-center font-bold p-4">Overview of all workouts</h1>
        {error && (
          <div className="text-red-800" role="alert">
            {error}
          </div>
        )}
        {workouts && users && (
          <>
            <section className="table-container-style">
              <WorkoutOverview workouts={workouts} users={users}/>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default WorkoutPage;

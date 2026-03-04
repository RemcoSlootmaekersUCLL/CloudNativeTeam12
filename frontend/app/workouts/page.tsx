import Header from "@/components/header";
import workoutService from "@/services/workoutService";
import WorkoutOverview from "@/components/workouts/workoutOverview";


const getData = async () => {
  try {
    const workouts = await workoutService.getAllWorkouts();

    return { data: workouts, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const metadata = {
  title: "Workouts",
};

const KlantenPage: React.FC = async () => {
  const { data, error } = await getData();

  return (
    <div>
      <Header />
      <main>
        <h1 className="text-center font-bold p-4">Overzicht van alle workouts.</h1>
        {error && (
          <div className="text-red-800" role="alert">
            {error}
          </div>)}
        {data && (<>
          <section className="table-container-style">
            <WorkoutOverview workouts={data} />
          </section>
        </>)}
      </main>
    </div>
  );
};

export default KlantenPage;
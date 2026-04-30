import ExerciseOverview from "@/components/exercises/exerciseOverview";
import exerciseService from "@/services/exerciseService";

const getData = async () => {
  try {
    const exercises = await exerciseService.getAllExercises();

    return { data: exercises, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const metadata = {
  title: "Exercises - Fitness tracker",
};

const ExercisePage: React.FC = async () => {
  const { data, error } = await getData();

  return (
    <div>
      <main>
        <h1 className="text-center font-bold p-4">
          Overview of all exercises
        </h1>
        {error && (
          <div className="text-red-800" role="alert">
            {error}
          </div>
        )}
        {data && (
          <>
            <section className="table-container-style">
              <ExerciseOverview exercises={data} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default ExercisePage;

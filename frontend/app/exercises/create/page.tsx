import CreateExercise from "@/components/exercises/createExercise";
import exerciseService from "@/services/exerciseService";

export const metadata = {
  title: "create exercise - Fitness tracker",
};

const getData = async () => {
  try {
    const exercises = await exerciseService.getAllExercises();

    return { data: exercises, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

const CreateExercisePage: React.FC = async () => {
  const { data, error } = await getData();
  return (
    <div>
      <main>
        <h1 className="font-xl font-bold text-2xl text-center py-2">
          Create exercise.
        </h1>
        {error && (
          <div className="text-red-800" role="alert">
            {error}
          </div>
        )}
        {data && (
          <>
            <section className="table-container-style">
              <CreateExercise exercises={data} />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default CreateExercisePage;

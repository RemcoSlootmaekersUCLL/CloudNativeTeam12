import CreateExercise from "@/components/exercises/createExercise";


export const metadata = {
    title: "create exercise - Fitness tracker",
};

const CreateExercisePage: React.FC = async () => {


    return (
        <div>
            <main>
                <h1 className="text-center font-bold p-4">Create exercise.</h1>
                <section className="table-container-style">
                    <CreateExercise />
                </section>
            </main>
        </div>
    );
};

export default CreateExercisePage;
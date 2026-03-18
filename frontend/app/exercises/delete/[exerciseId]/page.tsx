import Header from "@/components/header";
import DeleteExercise from "@/components/exercises/deleteExercise";

type Props = {
    params: Promise<{
        exerciseId: string;
    }>;
};

const DeleteExercisePage: React.FC<Props> = async ({ params }: Props) => {
    const { exerciseId } = await params;

    return (
        <div>
            <Header />
            <main>
                <h1 className="text-center font-bold p-4">Delete exercise {exerciseId}.</h1>
                <section className="table-container-style">
                    <DeleteExercise exerciseId={exerciseId} />
                </section>
            </main>
        </div>
    );
};

export default DeleteExercisePage;
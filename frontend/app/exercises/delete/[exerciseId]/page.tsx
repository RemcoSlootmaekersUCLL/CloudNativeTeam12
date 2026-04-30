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

            <main>
                <section className="table-container-style">
                    <DeleteExercise exerciseId={exerciseId} />
                </section>
            </main>
        </div>
    );
};

export default DeleteExercisePage;
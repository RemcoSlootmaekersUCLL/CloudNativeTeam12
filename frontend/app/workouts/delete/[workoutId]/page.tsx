import DeleteWorkout from "@/components/workouts/deleteWorkout";

type Props = {
    params: Promise<{
        workoutId: string;
    }>;
};

const DeleteWorkoutPage: React.FC<Props> = async ({ params }: Props) => {
    const { workoutId } = await params;

    return (
        <div>
            <main>
                <h1 className="text-center font-bold p-4">Delete workout {workoutId}.</h1>
                <section className="table-container-style">
                    <DeleteWorkout workoutId={workoutId} />
                </section>
            </main>
        </div>
    );
};

export default DeleteWorkoutPage;
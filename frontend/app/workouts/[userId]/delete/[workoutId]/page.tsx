import DeleteWorkout from "@/components/workouts/deleteWorkout";

type Props = {
    params: Promise<{
        userId: string;
        workoutId: string;
    }>;
};

const DeleteWorkoutPage: React.FC<Props> = async ({ params }: Props) => {
    const { userId,workoutId } = await params;

    return (
        <div>
            <main>
                <h1 className="text-center font-bold p-4">Delete workout.</h1>
                <section className="table-container-style">
                    <DeleteWorkout workoutId={workoutId} userId={userId} />
                </section>
            </main>
        </div>
    );
};

export default DeleteWorkoutPage;
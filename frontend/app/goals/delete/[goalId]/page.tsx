import DeleteGoal from "@/components/goals/deleteGoal";

type Props = {
    params: Promise<{
        goalId: string;
    }>;
};

const DeleteGoalPage: React.FC<Props> = async ({ params }: Props) => {
    const { goalId } = await params;

    return (
        <div>
            <main>
                <h1 className="text-center font-bold p-4">Delete goal {goalId}.</h1>
                <section className="table-container-style">
                    <DeleteGoal goalId={goalId} />
                </section>
            </main>
        </div>
    );
};

export default DeleteGoalPage;
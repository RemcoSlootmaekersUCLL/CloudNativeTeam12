import Header from "@/components/header";
import EditGoal from "@/components/goals/editGoal";
import goalService from "@/services/goalService";

type Props = {
    params: Promise<{
        goalId: string;
    }>;
};


export const metadata = {
    title: "edit goal - Fitness tracker",
};

const EditGoalPage: React.FC<Props> = async ({ params }: Props) => {
    const { goalId } = await params;
    const goal = await goalService.getGoal(goalId);

    return (
        <div>
            <Header />
            <main>
                <h1 className="text-center font-bold p-4">Edit goal {goalId}.</h1>
                <section className="table-container-style">
                    <EditGoal goalId={goalId} goal={goal} />
                </section>
            </main>
        </div>
    );
};

export default EditGoalPage;
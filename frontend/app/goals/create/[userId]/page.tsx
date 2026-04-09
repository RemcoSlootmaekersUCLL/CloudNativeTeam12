import CreateGoal from "@/components/goals/createGoal";

type Props = {
    params: Promise<{
        userId: string;
    }>;
};


export const metadata = {
    title: "create goal - Fitness tracker",
};

const CreateGoalPage: React.FC<Props> = async ({ params }: Props) => {
    const { userId } = await params;


    return (
        <div>
            <main>
                <h1 className="text-center font-bold p-4">Create goal for user {userId}.</h1>
                <section className="table-container-style">
                    <CreateGoal userId={userId} />
                </section>
            </main>
        </div>
    );
};

export default CreateGoalPage;
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
        <section className="table-container-style">
          <DeleteGoal goalId={goalId} />
        </section>
      </main>
    </div>
  );
};

export default DeleteGoalPage;

import ViewWorkout from "@/components/workouts/ViewWorkout";

type Props = {
  params: Promise<{
    workoutId: string;
  }>;
};

const ViewWorkoutPage: React.FC<Props> = async ({ params }: Props) => {
  const { workoutId } = await params;
  return (
    <div className="mx-4">
      <h1 className="text-center text-2xl font-bold p-4">View Workout</h1>
      <ViewWorkout workoutId={workoutId} />
    </div>
  );
};

export default ViewWorkoutPage;

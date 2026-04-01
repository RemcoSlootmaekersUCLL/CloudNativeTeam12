import EditWorkout from "@/components/workouts/editWorkout";

type Props = {
  params: Promise<{
    userId: string;
    workoutId: string;
  }>;
};
const editWorkoutPage: React.FC<Props> = async ({ params }: Props) => {
  const { userId, workoutId } = await params;
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[40%] p-2 mt-4 bg-zinc-800 rounded-xl border border-gray-400">
          <h1 className="font-xl font-bold text-2xl">Edit Your Workout</h1>
          <EditWorkout userId={userId} workoutId={workoutId} />
        </div>
      </div>
    </>
  );
};

export default editWorkoutPage;

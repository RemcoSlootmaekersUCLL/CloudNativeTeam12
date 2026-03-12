import CreateWorkout from "@/components/workouts/createWorkout";

type Props = {
  userId: string;
};

const createWorkoutPage: React.FC<Props> = ({ userId }: Props) => {
  return (
    <>
      <div className="mt-4 flex justify-center">Ping</div>
      <CreateWorkout userId={userId} />
    </>
  );
};

export default createWorkoutPage;

import Header from "@/components/header";
import workoutService from "@/services/workoutService";
import { Workouts } from "@/types";
import UserWorkouts from "@/components/workouts/userWorkouts";
import CreateWorkoutButton from "@/components/ui/createWorkoutButton";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

export const metadata = {
  title: "Workouts - Fitness tracker",
};

const WorkoutsOfUserPage: React.FC<Props> = async ({ params }: Props) => {
  const { userId } = await params;

  const workoutsByUser: Workouts[] =
    await workoutService.getWorkoutsFromUser(userId);

  return (
    <div>
      <Header />
      <main>
        <div className="flex flex-col justify-center">
          <h1 className="text-center font-bold p-4">
            Workouts by user {userId}.
          </h1>
          <span className="self-center">
            <CreateWorkoutButton userId={userId} />
          </span>
        </div>
        <div className="mt-4 table-container-style">
          <UserWorkouts userWorkouts={workoutsByUser} />
        </div>
      </main>
    </div>
  );
};

export default WorkoutsOfUserPage;

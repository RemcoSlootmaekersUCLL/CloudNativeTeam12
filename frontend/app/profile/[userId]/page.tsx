import ProfileOverview from "@/components/users/profileOverview";
import goalService from "@/services/goalService";
import userService from "@/services/userService";
import workoutService from "@/services/workoutService";
import Link from "next/link";

type Props = {
  params: Promise<{
    userId: string;
  }>;
};

const getData = async (userId: string) => {
  try {
    if (!userId || userId === "null") {
      return { data: { user: null, workouts: [], goals: [] }, error: null };
    }
    const user = await userService.getUserById(userId);
    if (!user) {
      return { data: { user: null, workouts: [], goals: [] }, error: null };
    }
    const workouts = await workoutService.getWorkoutsFromUser(userId);
    const goals = await goalService.getGoalsFromUser(userId);

    return { data: { user, workouts, goals }, error: null };
  } catch (error) {
    return { data: null, error: (error as Error).message };
  }
};

export const metadata = {
  title: "User profile - Fitness tracker",
};

const UserPage: React.FC<Props> = async ({ params }: Props) => {
  const { userId } = await params;
  const { data, error } = await getData(userId);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold p-4">Your Profile</h1>
      {error && (
        <div className="text-red-800" role="alert">
          {error}
        </div>
      )}
      {data && data.user != null && (
        <>
          <section className="table-container-style">
            <ProfileOverview
              user={data.user}
              workouts={data.workouts}
              goals={data.goals}
            />
          </section>
        </>
      )}
      {data && data.user == null && (
        <>
          <section className="flex flex-col max-width-100 justify-center items-center px-4">
            <h1>Please login first</h1>
            <Link
              href="/login"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Go to login page
            </Link>
          </section>
        </>
      )}
    </div>
  );
};

export default UserPage;

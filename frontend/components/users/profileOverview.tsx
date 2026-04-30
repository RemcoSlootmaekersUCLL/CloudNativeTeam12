import { Goals, Users, Workouts } from "@/types";
import Link from "next/link";

type Props = {
  user: Users;
  workouts: Workouts[];
  goals: Goals[];
};

const ProfileOverview: React.FC<Props> = ({ user, workouts, goals }) => {
  const createButton =
    "justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center";
  return (
    <>
      <div className="flex flex-col items-center py-2">
        <h2 className="font-bold text-xl py-2">User Information</h2>
        {user ? (
          <table className="userInfoTable">
            <thead className="border-amber-100">
              <tr>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Weight</th>
                <th className="px-4 py-2">Height</th>
                <th className="px-4 py-2">BMI</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.age}</td>
                <td className="px-4 py-2">{user.weight}</td>
                <td className="px-4 py-2">{user.height}</td>
                <td className="px-4 py-2">{user.bmi}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-red-400">
            Something went wrong displaying your user information...
          </p>
        )}
      </div>

      <div className="flex flex-col items-center py-2">
        <div className="flex gap-2 items-center mb-1">
          <h2 className="font-bold text-lg py-2">Your Workouts</h2>
        </div>
        <div className="pb-3">
          <Link href={`/workouts/${user.id}/create`} className="button">Create Workout</Link>
        </div>
        {workouts ? (
          <table className="userWorkoutsTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Exercises</th>
                <th className="text-center">Options</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={index}>
                  <td>{workout.date}</td>
                  <td>
                    {workout.exercises.map((ex, index) => (
                      <div key={index} className="capitalize">
                        {ex.name} - {ex.type}
                      </div>
                    ))}
                  </td>
                  <td className="py-2 flex gap-2">
                    <Link
                      href={`/workouts/view/${workout.id}`}
                      className="button"
                    >
                      View Workout
                    </Link>
                    <Link
                      href={`/workouts/${user.id}/edit/${workout.id}`}
                      className="button"
                    >
                      Edit Workout
                    </Link>
                    <Link
                      href={`/workouts/delete/${workout.id}`}
                      className="redButton"
                    >
                      Delete workout
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-400">
            Something went wrong displaying your workouts...
          </p>
        )}
      </div>

      <div className="flex flex-col items-center py-2">
        <div className="flex gap-2 items-center mb-1">
          <h2 className="font-bold text-lg py-2">Your Goals</h2>
        </div>
        <div className="pb-3">
          <Link href={`/goals/create/${user.id}`} className="button"> Create Goal</Link>
        </div>
        {goals ? (
          <table className="userGoalsTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Start date</th>
                <th>End date</th>
                <th>Completion</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal, index) => (
                <tr key={index}>
                  <td>{goal.name}</td>
                  <td>{goal.startDate}</td>
                  <td>{goal.endDate}</td>
                  <td className="text-center">
                    {goal.wasSuccessful ? "✔️" : "❌"}
                  </td>
                  <td className="py-2 flex gap-2">
                    <Link
                      href={`/goals/edit/${goal.id}`}
                      className="button"
                    >
                      Edit goal
                    </Link>
                    <Link
                      href={`/goals/delete/${goal.id}`}
                      className="redButton"
                    >
                      Delete goal
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-red-400">
            Something went wrong displaying your goals...
          </p>
        )}
      </div>
    </>
  );
};

export default ProfileOverview;

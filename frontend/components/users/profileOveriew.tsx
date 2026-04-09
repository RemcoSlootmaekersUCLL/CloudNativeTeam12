import { Goals, Users, Workouts } from "@/types";
import Link from "next/link";

type Props = {
  user: Users;
  workouts: Workouts[];
  goals: Goals[];
};

const ProfileOverview: React.FC<Props> = ({ user, workouts, goals }) => {
  return (
    <>
      <div className="ml-4">
        <h2 className="font-bold text-xl">User Information</h2>
        {user ? (
          <table className="userInfoTable">
            <tbody>
              <tr>
                <td className="font-bold">Username</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td className="font-bold">Age</td>
                <td>{user.age}</td>
              </tr>
              <tr>
                <td className="font-bold">Weight</td>
                <td>{user.weight}</td>
              </tr>
              <tr>
                <td className="font-bold">Height</td>
                <td>{user.height}</td>
              </tr>
              <tr>
                <td className="font-bold">BMI</td>
                <td>{user.bmi}</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className="text-red-400">
            Something went wrong displaying your user information...
          </p>
        )}
      </div>

      <div className="mt-4 ml-4">
        <h2 className="font-bold text-lg">Your Workouts</h2>
        {workouts ? (
          <table className="userWorkoutsTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Exercises</th>
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

      <div className="ml-4 mt-4">
        <h2 className="font-bold text-lg">Your Goals</h2>
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
                      className="edit-button"
                    >
                      Edit goal
                    </Link>
                    <Link
                      href={`/goals/delete/${goal.id}`}
                      className="delete-button"
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

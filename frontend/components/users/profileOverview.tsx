import { Goals, Users, Workouts } from "@/types";
import Link from "next/link";

type Props = {
  user: Users;
  workouts: Workouts[];
  goals: Goals[];
};

const ProfileOverview: React.FC<Props> = ({ user, workouts, goals }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex justify-center">
        <section className="bg-white border-2 border-gray-300 p-6 w-full max-w-2xl rounded-2xl">
          <h2 className="font-bold text-gray-800 text-lg mb-4 border-b-2 border-gray-200 pb-2">
            User Information
          </h2>
          {user ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Username
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Age
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Weight
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Height
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      BMI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {user.username}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{user.age}</td>
                    <td className="px-4 py-3 text-gray-600">{user.weight}</td>
                    <td className="px-4 py-3 text-gray-600">{user.height}</td>
                    <td className="px-4 py-3 text-gray-600">{user.bmi}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-red-400">
              Something went wrong displaying your user information...
            </p>
          )}
        </section>
      </div>

      <div className="flex gap-6 items-start">
        <section className="bg-white border-2 border-gray-300 p-6 flex-1 min-w-0 rounded-2xl">
          <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-2">
            <h2 className="font-bold text-gray-800 text-lg">Your Workouts</h2>
            <Link href={`/workouts/${user.id}/create`} className="button">
              + Create Workout
            </Link>
          </div>
          {workouts ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Date
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Exercises
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {workouts.map((workout, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {workout.date}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {workout.exercises.map((ex, index) => (
                          <div key={index} className="capitalize text-sm">
                            {ex.name} <span className="text-gray-400">·</span>{" "}
                            {ex.type}
                          </div>
                        ))}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link
                            href={`/workouts/view/${workout.id}`}
                            className="button"
                          >
                            View
                          </Link>
                          <Link
                            href={`/workouts/${user.id}/edit/${workout.id}`}
                            className="button"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/workouts/${user.id}/delete/${workout.id}`}
                            className="redButton"
                          >
                            Delete
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-red-400">
              Something went wrong displaying your workouts...
            </p>
          )}
        </section>

        <section className="bg-white border-2 border-gray-300 p-6 flex-1 min-w-0 rounded-2xl">
          <div className="flex items-center justify-between mb-4 border-b-2 border-gray-200 pb-2">
            <h2 className="font-bold text-gray-800 text-lg">Your Goals</h2>
            <Link href={`/goals/create/${user.id}`} className="button">
              + Create Goal
            </Link>
          </div>
          {goals ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Name
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Start date
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      End date
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600 text-center">
                      Done
                    </th>
                    <th className="px-4 py-2 font-semibold text-gray-600">
                      Options
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {goals.map((goal, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium text-gray-800">
                        {goal.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {goal.startDate}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {goal.endDate}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {goal.wasSuccessful ? (
                          <span className="text-green-500 font-bold">✓</span>
                        ) : (
                          <span className="text-gray-300 font-bold">✗</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <Link
                            href={`/goals/edit/${goal.id}`}
                            className="button"
                          >
                            Edit
                          </Link>
                          <Link
                            href={`/goals/delete/${goal.id}`}
                            className="redButton"
                          >
                            Delete
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-red-400">
              Something went wrong displaying your goals...
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfileOverview;

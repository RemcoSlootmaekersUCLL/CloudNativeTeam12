import { Users, Workouts } from "@/types";
import Link from "next/link";

type Props = {
  workouts: Workouts[];
  users:Users[];
};

const WorkoutOverview: React.FC<Props> = ({ workouts,users }) => {
  return (
    <>
      {workouts && (
        <table className="mx-auto min-w-250 border-collapse border border-gray-300">
          <thead className="bg-black-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Exercises</th>
              <th className="border border-gray-300 px-4 py-2">View all of user</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((w, i) => (
              <tr key={i}>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {users.find(user => user.id == w.userId)?.username}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-left">{w.date}</td>
                <td className="border border-gray-300 px-4 py-2 text-left">
                  {w.exercises.map((exercise, index) => (
                    <div key={index}>
                      {exercise.name}, {exercise.type}
                    </div>
                  ))}
                </td>
                <td className="flex gap-4 py-3 justify-center">
                  <Link
                    href={`/workouts/${w.userId}`}
                    className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    all workouts of user
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default WorkoutOverview;

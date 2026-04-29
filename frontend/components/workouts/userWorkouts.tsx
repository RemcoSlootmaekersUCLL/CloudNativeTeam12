import { Users, Workouts } from "@/types";

type Props = {
  userWorkouts: Workouts[];
  user:Users;
};

const UserWorkouts: React.FC<Props> = ({ userWorkouts,user}) => {
  return (
    <>
      {userWorkouts && (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-black-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">User</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Exercises</th>
            </tr>
          </thead>
          <tbody>
            {userWorkouts.map((w, i) => (
              <tr key={i} className="">
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {user.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">{w.date}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {w.exercises.map((exercise, index) => (
                    <div key={index}>
                      {exercise.name}, {exercise.type}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserWorkouts;

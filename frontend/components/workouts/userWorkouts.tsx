import { Workouts } from "@/types";

type Props = {
  userWorkouts: Workouts[];
};

const UserWorkouts: React.FC<Props> = ({ userWorkouts }) => {
  return (
    <>
      {userWorkouts && (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-black-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">userId</th>
              <th className="border border-gray-300 px-4 py-2">date</th>
              <th className="border border-gray-300 px-4 py-2">exercises</th>
            </tr>
          </thead>
          <tbody>
            {userWorkouts.map((w, i) => (
              <tr key={i} className="">
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {w.userId}
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

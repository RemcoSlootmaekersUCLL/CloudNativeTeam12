import { Users } from "@/types";
import Link from "next/link";

type Props = {
  users: Users[];
};

const UserOverview: React.FC<Props> = ({ users }) => {
  return (
    <>
      {users && (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-black-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2">userId</th>
              <th className="border border-gray-300 px-4 py-2">username</th>
              <th className="border border-gray-300 px-4 py-2">password</th>
              <th className="border border-gray-300 px-4 py-2">age</th>
              <th className="border border-gray-300 px-4 py-2">weight</th>
              <th className="border border-gray-300 px-4 py-2">height</th>
              <th className="border border-gray-300 px-4 py-2">BMI</th>
              <th className="border border-gray-300 px-4 py-2">options</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="">
                <td className="border border-gray-300 px-4 py-2">{u.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {u.username}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {u.password}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {u.age}
                </td>
                <td className="border border-gray-300 px-4 py-2">{u.weight}</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  {u.height}
                </td>
                <td className="border border-gray-300 px-4 py-2">{u.bmi}</td>

                <td>
                  <Link href={`/users/delete/${u.id}`} className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">delete user</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table >
      )}
    </>
  );
};

export default UserOverview;

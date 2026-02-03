import { sort } from "fast-sort";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortBy: string;
}

const UsersTable = async ({ sortBy }: Props) => {
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  let users: User[] = await result.json();

  const sortedUsers = sort(users).asc(
    sortBy === "email" ? (user) => user.email : (user) => user.name,
  );

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>
              <Link href="/users?sortBy=name">Name</Link>
            </th>
            <th>
              <Link href="/users?sortBy=email">Email</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;

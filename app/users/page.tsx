import Link from "next/link";
import UsersTable from "./[[...slug]]/UsersTable";
// import { Suspense } from "react";

interface Props {
  searchParams: Promise<{ sortBy: string }>;
}

const UsersPage = async ({ searchParams }: Props) => {
  const { sortBy } = await searchParams;
  return (
    <div>
      <h1 className="my-3 text-3xl">Users</h1>
      <Link href="/users/new" className="mb-3 btn">
        New User
      </Link>
      {/* <Suspense fallback={<p>Loading...</p>}>
        <UsersTable sortBy={sortBy} />
      </Suspense> */}
      <UsersTable sortBy={sortBy} />
    </div>
  );
};

export default UsersPage;

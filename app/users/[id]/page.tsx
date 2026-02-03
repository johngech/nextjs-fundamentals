import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: number }>;
}

const UserDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  if (id > 10) return notFound();
  return <div>UserDetailPage: {id}</div>;
};

export default UserDetailPage;

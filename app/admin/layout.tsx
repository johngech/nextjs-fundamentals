import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="flex">
        <aside className="bg-slate-200 p-5 mr-5 rounded-2xl">Side bar</aside>
        <div className="bg-slate-100 p-5 rounded-2xl">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;

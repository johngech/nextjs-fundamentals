import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex bg-slate-200 p-5 space-x-5">
      <Link href="/">Next.JS</Link>
      <Link href="/users">Users</Link>
      <Link href="/products">Products</Link>
    </div>
  );
};

export default NavBar;

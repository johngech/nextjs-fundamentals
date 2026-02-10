// "use client";

import Link from "next/link";
import { auth } from "@/app/auth";
import SearchBox from "./components/SearchBox";
import ProfileImage from "./components/ProfileImage";

const NavBar = async () => {
  const session = await auth();

  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-8 relative z-50">
      {/* --- START: Hamburger + Logo --- */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            type="button"
            className="btn btn-ghost lg:hidden"
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul className="menu menu-sm dropdown-content mt-3 z-100 p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-200">
            <li>
              <Link href="/users">Users</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost text-xl font-bold tracking-tight "
        >
          Next.js
        </Link>
      </div>

      {/* --- CENTER: Desktop Links --- */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link
              href="/users"
              className="hover:bg-primary hover:text-primary-content rounded-md transition-colors"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="hover:bg-primary hover:text-primary-content rounded-md transition-colors"
            >
              Products
            </Link>
          </li>
        </ul>
      </div>

      {/* --- END: Search & User --- */}
      <div className="navbar-end gap-2 md:gap-4">
        <SearchBox />

        {session ? (
          <div className="dropdown dropdown-end">
            <button
              type="button"
              className="btn btn-ghost btn-circle avatar online ring-2 ring-primary/10"
            >
              <div className="w-10 rounded-full">
                <ProfileImage src={session.user?.image} />
              </div>
            </button>
            <ul className="mt-3 z-100 p-2 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
              <li className="menu-title opacity-70">{session.user?.name}</li>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <Link href="/settings">Settings</Link>
              </li>
              <div className="divider my-0"></div>
              <li>
                <Link
                  href="/api/auth/signout"
                  className="text-error hover:bg-error hover:text-white"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            href="/api/auth/signin"
            className="btn btn-primary btn-sm md:btn-md shadow-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

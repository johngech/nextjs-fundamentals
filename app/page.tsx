import Link from "next/link";
import ProductList from "./components/ProductList";
import { auth } from "@/app/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      <h1>Hello {session?.user?.name}</h1>
      <Link href="/users"> Users</Link>
      <ProductList />
    </main>
  );
}

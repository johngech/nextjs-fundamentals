import Link from "next/link";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <main>
      <h1>Hello world</h1>
      <Link href="/users"> Users</Link>
      <ProductList />
    </main>
  );
}

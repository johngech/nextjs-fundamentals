import Link from "next/link";
import ProductList from "./components/ProductList";
import { auth } from "@/app/auth";
import ShowImage from "./components/ShowImage";
import { Metadata } from "next";
import HeavyComponent from "./components/HeavyComponent";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      <h1>Hello {session?.user?.name}</h1>
      <Link href="/users"> Users</Link>
      <ProductList />
      <ShowImage />
      <HeavyComponent />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Next App",
  openGraph: {
    title: "Maraki Code",
    description: "Description",
  },
};

// Generate metadata dynamically

// export async function generateMetadata(): Promise<Metadata> {
//   type Product = { title: string; description: string };
//   const response = await fetch("");
//   const product: Product = await response.json();
//   return {
//     title: product.title,
//     description: product.description,
//   };
// }

import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { ProductCreateSchema } from "./schema";
import { ErrorResponse } from "@/app/types";
import { Product } from "@/app/generated/prisma/client";
import { prisma } from "@/prisma/client";

type ProductCreateRequest = z.infer<typeof ProductCreateSchema>;

type ProductResponse = Omit<Product, "price"> & {
  price: number;
};

export async function GET(
  request: NextRequest,
): Promise<NextResponse<ProductResponse[]>> {
  const products = await prisma.product.findMany();
  const response: ProductResponse[] = products.map((product) => ({
    ...product,
    price: Number(product.price), // Convert string of price(prisma convert price to string internally) to number
  }));
  return NextResponse.json(response);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ProductResponse | ErrorResponse>> {
  const body: ProductCreateRequest = await request.json();
  const validation = ProductCreateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 },
    );
  const { title, price, userId, description } = validation.data;
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (!user)
    return NextResponse.json(
      { error: `User with ID: ${userId} doesn't exist.` },
      { status: 404 },
    );

  const product = await prisma.product.create<{ data: ProductCreateRequest }>({
    data: {
      userId: userId,
      title: title,
      price: price,
      description: description,
    },
  });

  const response: ProductResponse = {
    ...product,
    price: Number(product.price),
  };
  return NextResponse.json(response, { status: 201 });
}

import z from "zod";
import { NextRequest, NextResponse } from "next/server";
import { ProductUpdateSchema } from "../schema";
import { Product } from "@/app/generated/prisma/browser";
import { ErrorResponse } from "@/app/types";
import { prisma } from "@/prisma/client";

interface Props {
  params: Promise<{ id: string }>;
}

type ProductUpdateRequest = z.infer<typeof ProductUpdateSchema>;

type ProductResponse = Omit<Product, "price"> & {
  price: number;
};

export async function GET(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<ProductResponse | ErrorResponse>> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number.parseInt(id) },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const response: ProductResponse = {
    ...product,
    price: Number(product.price),
  };
  return NextResponse.json(response);
}

export async function PATCH(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<ProductResponse | ErrorResponse>> {
  const body: ProductUpdateRequest = await request.json();
  const validation = ProductUpdateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 },
    );
  const { id } = await params;
  const { title, price, description } = validation.data;
  const product = await prisma.product.findUnique({
    where: { id: Number.parseInt(id) },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });

  const updatedProduct = await prisma.product.update<{
    where: { id: number };
    data: ProductUpdateRequest;
  }>({
    where: {
      id: Number.parseInt(id),
    },
    data: {
      title: title,
      price: price,
      description: description,
    },
  });
  const response: ProductResponse = {
    ...updatedProduct,
    price: Number(updatedProduct.price),
  };
  return NextResponse.json(response);
}

export async function DELETE(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<null | ErrorResponse>> {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number.parseInt(id) },
  });
  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  await prisma.product.delete({
    where: { id: Number.parseInt(id) },
  });
  return new NextResponse(null, { status: 204 });
}

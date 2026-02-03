import { NextRequest, NextResponse } from "next/server";
import { ProductUpdateSchema } from "../schema";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface Props {
  params: Promise<{ id: number }>;
}

interface ProductUpdateRequest {
  price: number;
}

interface ErrorResponse {
  error: string;
}

export async function GET(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<Product | ErrorResponse>> {
  const { id } = await params;
  if (id > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return NextResponse.json({
    id: 1,
    title: "Product 1",
    price: 11.1,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<Product | ErrorResponse>> {
  const body: ProductUpdateRequest = await request.json();
  const validation = ProductUpdateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 },
    );
  return NextResponse.json({ id: 1, title: "Product 1", ...validation.data });
}

export async function DELETE(
  request: NextRequest,
  { params }: Props,
): Promise<NextResponse<null | ErrorResponse>> {
  const { id } = await params;
  if (id > 10)
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  return new NextResponse(null, { status: 204 });
}

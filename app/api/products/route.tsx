import { NextRequest, NextResponse } from "next/server";
import { ProductCreateSchema } from "./schema";

interface Product {
  id: number;
  title: string;
  price: number;
}

interface ProductCreateRequest {
  title: string;
  price: number;
}

interface ErrorResponse {
  error: string;
}

export function GET(request: NextRequest): NextResponse<Product[]> {
  return NextResponse.json([
    { id: 1, title: "Product 1", price: 11.1 },
    { id: 2, title: "Product 2", price: 10.3 },
  ]);
}

export async function POST(
  request: NextRequest,
): Promise<NextResponse<Product | ErrorResponse>> {
  const body: ProductCreateRequest = await request.json();
  const validation = ProductCreateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.message },
      { status: 400 },
    );
  return NextResponse.json({ id: 1, ...validation.data }, { status: 201 });
}

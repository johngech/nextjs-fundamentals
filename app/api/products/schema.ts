import { z } from "zod";

export const ProductCreateSchema = z.object({
  title: z.string().min(3).max(20),
  price: z.number().min(1).max(100),
});

export const ProductUpdateSchema = z.object({
  price: z.number().min(1).max(100),
});

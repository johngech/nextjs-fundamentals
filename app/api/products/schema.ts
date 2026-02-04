import { z } from "zod";

export const ProductCreateSchema = z.object({
  userId: z.number(),
  title: z.string().min(3).max(20),
  price: z.number().min(1).max(100),
  description: z.string().optional(),
});

export const ProductUpdateSchema = z.object({
  title: z.string().min(3).max(20),
  description: z.string().optional(),
  price: z.number().min(1).max(100),
});

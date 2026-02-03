import z from "zod";

export const UserCreateSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 3 characters long" })
    .max(20, { error: "Name must be a maximum of 20 characters long" }),
  email: z.email({ error: "Email must be valid" }),
});

export const UserUpdateSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 3 characters long" })
    .max(20, { error: "Name must be a maximum of 20 characters long" }),
});

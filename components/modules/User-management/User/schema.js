import {z} from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid email address"),

  role: z
    .string()
    .min(1, "Role is required"),

  nid: z
    .string()
    .min(10, "NID must be at least 10 digits")
    .max(20, "NID is too long"),
});

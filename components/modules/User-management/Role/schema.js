import { z } from "zod";

export const roleSchema = z.object({
  userId: z.string().min(1, "Select User"),
  assignRole: z.string().min(1, "Select Role"),
  permissions: z.array(z.string()).min(1, "Select at least one permission"),
});
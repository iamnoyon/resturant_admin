import {z} from "zod";

export const packageSchema = z.object({
  packageName: z.string().min(1, 'Package name is required'),
  numberOfMonth: z.coerce.number().min(1, 'Number of months is required'),
  price: z.coerce.number().min(1, 'Price is required'),
  shortNote: z.string().optional(),
  status: z.string().optional()
});

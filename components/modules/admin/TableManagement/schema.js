import {z} from "zod";

export const tableSchema = z.object({
  tableName: z.string().min(1, 'Table name is required'),
  totalSeat: z.coerce.number(1, 'Total seat is required'),
  isActive: z.boolean().optional()
});

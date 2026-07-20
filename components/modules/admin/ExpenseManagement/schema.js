import {z} from "zod";

export const expenseSchema = z.object({
  expenseName: z.string().min(1, 'Expense title is required'),
  expenseValue: z.coerce.number(1, 'Expense value is required'),
});

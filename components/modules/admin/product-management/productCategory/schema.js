import {z} from 'zod';

export const categorySchema = z.object({
    categoryName: z.string().min(1, "Category name is required."),
    shortNote: z.string().optional(),
    imageUrl: z.string().optional().nullable(),
    isActive: z.boolean()
})

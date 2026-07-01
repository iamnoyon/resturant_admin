import {z} from 'zod';

export const categorySchema = z.object({
    name: z.string().min(1, "Category name is required."),
    slug: z.string().min(1, 'Category slug is required'),
    isActive: z.boolean(),
    description: z.string().optional(),
    image: z.union([
    z.string().min(1, "Category photo is required"),
    z.object({}).passthrough(),
  ]),
})
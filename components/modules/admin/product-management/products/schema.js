import {z} from 'zod';

export const productSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  categoryId: z.coerce.string().min(1, 'Category is required'),
  description: z.string().optional(),
  costPrice: z.coerce.number().min(1, 'Costing Price is required'),
  soldPrice: z.coerce.number().min(1, 'Selling Price is required'),
  stockRequired: z.boolean(),
  stock: z.coerce.number().optional(),
  imageUrl: z.string().optional(),
  isActive: z.boolean(),
});

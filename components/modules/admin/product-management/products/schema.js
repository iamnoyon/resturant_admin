import {z} from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Product slug is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  discountPrice: z.string().optional(),
  stock: z.coerce.number().min(1, 'Stock is required'),
  sku: z.string().min(1, 'SKU is required'),
  shortnote: z.string().optional(),
  features: z.array(z.string()).optional(),
  images: z.array(z.union([
    z.string(),
    z.object({}).passthrough(),
  ])).optional(),
  tags: z.string().optional(),
  isActive: z.boolean(),
  isFeatured: z.boolean(),
  categoryId: z.string().min(1, 'Category is required'),
});

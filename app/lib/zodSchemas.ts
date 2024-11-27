import {z} from 'zod'

export const productScheme = z.object({
    name: z.string(),
    description: z.string(),
    status: z.enum(["draft", "published", "archived"]),
    price: z.number().min(1),
    image: z.array(z.string()).min(1, "At least 1 image is required"),
    category: z.enum(["phone", "tablet", "laptop"]),
    isFeatured: z.boolean().optional(),
});

export const bannerSchema = z.object({
    title: z.string(),
    imageString: z.string(),
})
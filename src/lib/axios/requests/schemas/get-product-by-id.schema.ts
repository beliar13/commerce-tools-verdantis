import { z } from 'zod';

const LocalizedStringSchema = z.record(z.string());

const AttributeValueSchema = z.record(z.string());
const AttributeSchema = z.object({
  name: z.string(),
  value: AttributeValueSchema,
});

const MasterVariantSchema = z.object({
  attributes: z.array(AttributeSchema),
  id: z.number(),
  images: z.array(
    z.object({
      dimensions: z.object({
        h: z.number(),
        w: z.number(),
      }),
      label: z.string().optional(),
      url: z.string(),
    }),
  ),
  prices: z.array(z.any()),
});

const ProductTypeSchema = z.object({
  id: z.string().uuid(),
  typeId: z.string(),
});

export const ProductSchema = z.object({
  categories: z.array(z.any()),
  createdAt: z.string().datetime(),
  description: z.record(z.string()),
  hasStagedChanges: z.boolean(),
  id: z.string().uuid(),
  lastModifiedAt: z.string().datetime(),
  masterVariant: MasterVariantSchema,
  name: LocalizedStringSchema,
  productType: ProductTypeSchema,
  published: z.boolean(),
  searchKeywords: z.record(z.any()),
  slug: LocalizedStringSchema,
  variants: z.array(z.any()),
  version: z.number(),
});

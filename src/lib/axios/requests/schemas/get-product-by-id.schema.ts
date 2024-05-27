import { z } from 'zod';
// Schema for localized strings
const LocalizedStringSchema = z.record(z.string());

// Schema for attributes
const AttributeValueSchema = z.record(z.string());
const AttributeSchema = z.object({
  name: z.string(),
  value: AttributeValueSchema,
});

// Schema for the master variant
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
  ), // Assuming images can be of any type
  prices: z.array(z.any()), // Assuming prices can be of any type
});

// Schema for the product type
const ProductTypeSchema = z.object({
  id: z.string().uuid(),
  typeId: z.string(),
});

// Main product schema
export const ProductSchema = z.object({
  categories: z.array(z.any()), // Assuming categories can be of any type
  createdAt: z.string().datetime(),
  description: z.record(z.string()),
  hasStagedChanges: z.boolean(),
  id: z.string().uuid(),
  lastModifiedAt: z.string().datetime(),
  masterVariant: MasterVariantSchema,
  name: LocalizedStringSchema,
  productType: ProductTypeSchema,
  published: z.boolean(),
  searchKeywords: z.record(z.any()), // Assuming searchKeywords is a record with values of any type
  slug: LocalizedStringSchema,
  variants: z.array(z.any()), // Assuming variants can be of any type
  version: z.number(),
});

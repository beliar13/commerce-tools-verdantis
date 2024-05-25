import { z } from 'zod';

const CategoryReferenceSchema = z.object({
  id: z.string(),
  typeId: z.string(),
});

const ProductVariantSchema = z.object({
  id: z.string(),
});

const ProductDataSchema = z.object({
  categories: z.array(CategoryReferenceSchema),
  masterVariant: ProductVariantSchema,
  name: z.string(),
  searchKeywords: z.string(),
  slug: z.record(z.string(), z.string()),
  variants: z.array(z.unknown()),
});

const ProductCatalogDataSchema = z.object({
  current: ProductDataSchema,
  hasStagedChanges: z.boolean(),
  published: z.boolean(),
  staged: ProductDataSchema,
});

export const productSchema = z.object({
  createdAt: z.string(),
  id: z.string(),
  lastModifiedAt: z.string(),
  masterData: ProductCatalogDataSchema,
  productType: z.object({
    id: z.string(),
    typeId: z.string(),
  }),
  taxCategory: z.object({
    id: z.string(),
    typeId: z.string(),
  }),
  version: z.number(),
});

export const getProductsResultSchema = z.object({
  count: z.number(),
  limit: z.number(),
  offset: z.number(),
  results: z.array(productSchema),
  total: z.number(),
});

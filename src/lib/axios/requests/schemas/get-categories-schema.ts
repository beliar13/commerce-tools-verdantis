import { z } from 'zod';

export type CategoriesRequestArguments = {
  expand?: unknown;
  limit?: number;
  offset?: number;
  sort?: unknown;
  where?: unknown;
  withTotal?: boolean;
};

// const CategoryReferenceSchema = z.object({
//   id: z.string(),
//   typeId: z.string(),
// });

export const categorySchema = z.object({
  ancestors: z.array(z.unknown()),
  assets: z.unknown().optional(),
  createdAt: z.date(),
  createdBy: z.unknown().optional(),
  custom: z.object({ fields: z.unknown(), type: z.unknown() }).optional(),
  description: z.record(z.string(), z.string()),
  externalId: z.string().optional(),
  hasStagedChanges: z.boolean(),
  id: z.string(),
  key: z.string().optional(),
  lastModifiedAt: z.date(),
  lastModifiedBy: z.unknown().optional(),
  metaDescription: z.record(z.string(), z.string()).optional(),
  metaTitle: z.record(z.string(), z.string()).optional(),
  name: z.record(z.string(), z.string()),
  orderHint: z.string().optional(),
  parent: z.unknown().optional(),
  published: z.boolean(),
  slug: z.record(z.string(), z.string()),
  version: z.number(),
});
export type Category = z.infer<typeof categorySchema>;

export const categoriesResponsesSchema = z.object({
  hasStagedChanges: z.boolean(),
  limit: z.number(),
  offset: z.number(),
  results: z.array(categorySchema),
  sort: z.number(),
  total: z.number().optional(),
});

export type CategoriesResponse = z.infer<typeof categoriesResponsesSchema>;

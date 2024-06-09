import { z } from 'zod';

export type CartDraft = z.infer<typeof cartSchema>;
export type CartResponse = z.infer<typeof cartResponseSchema>;

export const cartSchema = z.object({
  currency: z.record(z.string(), z.string()),
  id: z.string().optional(),
  key: z.string().optional(),
});

// export const cartSchema = z.object({
//   id: z.string().optional(),
//   version: z.number(),
//   createdAt: z.string(),
//   lastModifiedAt: z.string(),
//   customer: z
//     .object({
//       id: z.string().optional(),
//       email: z.string().optional(),
//       firstName: z.string().optional(),
//       lastName: z.string().optional(),
//     })
//     .optional(),
//   lineItems: z.array(
//     z.object({
//       id: z.string(),
//       productId: z.string(),
//       variantId: z.string(),
//       quantity: z.number(),
//       price: z.object({
//         value: z.number(),
//         currency: z.string(),
//       }),
//     }),
//   ),
//   totalPrice: z.object({
//     value: z.number(),
//     currency: z.string(),
//   }),
// });

export const cartResponseSchema = z.object({
  createdAt: z.string(),
  customerEmail: z.string().optional(),
  id: z.string(),
  lastModifiedAt: z.string(),
  lineItems: z.array(z.unknown()),
  totalPrice: z.unknown(),
  version: z.number(),
});

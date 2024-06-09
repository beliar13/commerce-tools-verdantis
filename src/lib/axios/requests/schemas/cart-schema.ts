import { z } from 'zod';

import { lineItemSchema } from './line-item-schema';

export type CartDraft = z.infer<typeof cartSchema>;
export type CartResponse = z.infer<typeof cartResponseSchema>;

export const cartSchema = z.object({
  currency: z.record(z.string(), z.string()),
  id: z.string().optional(),
  key: z.string().optional(),
});

export const cartResponseSchema = z.object({
  createdAt: z.string(),
  customerEmail: z.string().optional(),
  id: z.string(),
  lastModifiedAt: z.string().optional(),
  lineItems: z.array(lineItemSchema),
  origin: z.string(),
  totalPrice: z.unknown(),
  version: z.number(),
});

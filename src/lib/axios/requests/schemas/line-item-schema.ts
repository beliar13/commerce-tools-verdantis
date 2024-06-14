import { z } from 'zod';

const userIdentifierSchema = z
  .string()
  .min(2)
  .max(256)
  .regex(/^[a-z0-9_-]+$/);
const productIdSchema = z.string();
const variantIdSchema = z.number().int();
const skuSchema = z.string();
const quantitySchema = z.number().int().default(1);
const addedAtSchema = z.unknown();
const channelResourceIdentifierSchema = z.object({
  id: z.string(),
  typeId: z.string().refine((typeId) => typeId === 'channel'),
});
const moneySchema = z.object({
  centAmount: z.number().int(),
  currencyCode: z.string(),
});
const externalLineItemTotalPriceSchema = z.object({
  price: moneySchema,
  totalPrice: moneySchema,
});
const externalTaxRateDraftSchema = z.object({
  amount: z.number(),
  includedInPrice: z.boolean(),
  name: z.string(),
});
const methodExternalTaxRateDraftSchema = z.object({
  externalTaxRate: externalTaxRateDraftSchema,
  shippingMethodId: z.string(),
});
const inventoryModeSchema = z.enum(['tracked', 'reserved', 'not_specified']);
const itemShippingDetailsDraftSchema = z.unknown();
const customFieldsDraftSchema = z.record(z.unknown());

export const lineItemSchema = z.object({
  addedAt: addedAtSchema.optional(),
  custom: customFieldsDraftSchema.optional(),
  distributionChannel: channelResourceIdentifierSchema.optional(),
  externalPrice: moneySchema.optional(),
  externalTaxRate: externalTaxRateDraftSchema.optional(),
  externalTotalPrice: externalLineItemTotalPriceSchema.optional(),
  id: z.string(),
  inventoryMode: inventoryModeSchema.optional(),
  key: userIdentifierSchema.optional(),
  perMethodExternalTaxRate: z.array(methodExternalTaxRateDraftSchema).optional(),
  productId: productIdSchema.optional(),
  quantity: quantitySchema,
  shippingDetails: itemShippingDetailsDraftSchema.optional(),
  sku: skuSchema.optional(),
  supplyChannel: channelResourceIdentifierSchema.optional(),
  variantId: variantIdSchema.optional(),
});

export type LineItem = z.infer<typeof lineItemSchema>;

import { z } from 'zod';

import { MasterVariantSchema } from './product-schema';

const variantIdSchema = z.number().int();
const skuSchema = z.string();
const quantitySchema = z.number().int().default(1);
const addedAtSchema = z.unknown();
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

const valueSchema = z.object({
  centAmount: z.number(),
  currencyCode: z.string(),
  fractionDigits: z.number(),
  type: z.string(),
});

const discountSchema = z.object({
  id: z.string(),
  typeId: z.string(),
});

const discountedSchema = z.object({
  discount: discountSchema,
  value: valueSchema,
});

export const priceSchema = z.object({
  discounted: discountedSchema.optional(),
  id: z.string(),
  key: z.string(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  value: valueSchema,
});

export const lineItemSchema = z.object({
  addedAt: addedAtSchema.optional(),
  custom: customFieldsDraftSchema.optional(),
  externalPrice: moneySchema.optional(),
  externalTaxRate: externalTaxRateDraftSchema.optional(),
  externalTotalPrice: externalLineItemTotalPriceSchema.optional(),
  id: z.string(),
  inventoryMode: inventoryModeSchema.optional(),
  key: z.string().optional(),
  name: z.record(z.string(), z.string()),
  perMethodExternalTaxRate: z.array(methodExternalTaxRateDraftSchema).optional(),
  price: priceSchema,
  productId: z.string(),
  productType: z.unknown(),
  quantity: quantitySchema.optional(),
  shippingDetails: itemShippingDetailsDraftSchema.optional(),
  sku: skuSchema.optional(),
  variant: MasterVariantSchema,
  variantId: variantIdSchema.optional(),
});

export type LineItem = z.infer<typeof lineItemSchema>;

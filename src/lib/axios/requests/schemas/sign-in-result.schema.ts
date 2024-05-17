import { z } from 'zod';

import { customerSchema } from './customer.schema';

export const signInResultSchema = z.object({
  cart: z.unknown().optional(),
  customer: customerSchema,
});

export type SignInResult = z.infer<typeof signInResultSchema>;

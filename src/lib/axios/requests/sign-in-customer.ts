// https://docs.commercetools.com/api/projects/me-profile#authenticate-sign-in-customer
// https://docs.commercetools.com/api/projects/me-profile#mycustomersignin
// https://docs.commercetools.com/api/projects/customers#customer

import { isAxiosError } from 'axios';
import { z } from 'zod';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './axios-error-msg.schema';

const myCustomerSignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const customerSchema = z.object({
  addresses: z.array(z.unknown()),
  authenticationMode: z.unknown(),
  billingAddressIds: z.array(z.string()).optional(),
  companyName: z.string().optional(),
  createdAt: z.string(),
  customerGroup: z.unknown(),
  customerNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  defaultBillingAddressId: z.string().optional(),
  defaultShippingAdressId: z.string().optional(),
  email: z.string(),
  extarnalId: z.string().optional(),
  firstName: z.string().optional(),
  id: z.string(),
  isEmailVerified: z.boolean(),
  key: z.string().optional(),
  lastModifiedAt: z.string(),
  lastName: z.string().optional(),
  locale: z.string().optional(),
  middleName: z.string().optional(),
  password: z.string().optional(),
  salutation: z.string().optional(),
  shippingAddressIds: z.array(z.string()).optional(),
  stores: z.unknown(),
  title: z.string().optional(),
  vatId: z.string().optional(),
  version: z.number(),
});

const signInResultSchema = z.object({
  cart: z.unknown().optional(),
  customer: customerSchema,
});

type SignInResult = z.infer<typeof signInResultSchema>;

type MyCustomerSignIn = z.infer<typeof myCustomerSignInSchema>;

export async function signInCustomer(
  { email, password }: MyCustomerSignIn,
  BEARER_TOKEN: string,
): Promise<SignInResult> {
  try {
    const customerSignInResult = await apiInstance.post(
      `/${envVariables.PROJECT_KEY}/me/login`,
      {
        email,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );

    return signInResultSchema.parse(customerSignInResult.data);
  } catch (e) {
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}

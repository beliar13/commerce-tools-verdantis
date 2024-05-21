import { isAxiosError } from 'axios';
import { z } from 'zod';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { SignUpResult, signUpResultSchema } from './schemas/sign-up-result-schema';

const RegistrationAddressSchema = z.object({
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  region: z.string().optional(),
  streetName: z.string(),
});

const myCustomerDraftSchema = z.object({
  addresses: z.array(RegistrationAddressSchema).optional(),
  companyName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  defaultBillingAddress: z.number().optional(),
  defaultShippingAddress: z.number().optional(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  locale: z.string().optional(),
  middleName: z.string().optional(),
  password: z.string(),
  salutation: z.string().optional(),
  stores: z.unknown().optional(),
  title: z.string().optional(),
  vatId: z.string().optional(),
});

export type MyCustomerDraft = z.infer<typeof myCustomerDraftSchema>;

export async function signUpCustomer(
  myCustomerDraft: MyCustomerDraft,
  BEARER_TOKEN: string,
): Promise<SignUpResult> {
  try {
    const customerSignInResult = await apiInstance.post(
      `/${envVariables.PROJECT_KEY}/me/signup`,
      myCustomerDraft,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );

    return signUpResultSchema.parse(customerSignInResult.data);
  } catch (e) {
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}

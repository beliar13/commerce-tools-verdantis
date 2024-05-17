import { isAxiosError } from 'axios';
import { z } from 'zod';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { SignInResult, signInResultSchema } from './schemas/sign-in-result.schema';

const myCustomerDraftSchema = z.object({
  addresses: z.array(z.unknown()).optional(),
  companyName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  defaultBillingAddress: z.number().optional(),
  defaultShippingAddress: z.number().optional(),
  email: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  locale: z.string().optional(),
  middleName: z.string().optional(),
  password: z.string(),
  salutation: z.string().optional(),
  stores: z.unknown().optional(),
  title: z.string().optional(),
  vatId: z.string().optional(),
});

type MyCustomerDraft = z.infer<typeof myCustomerDraftSchema>;

export async function signUpCustomer(
  myCustomerDraft: MyCustomerDraft,
  BEARER_TOKEN: string,
): Promise<SignInResult> {
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

    return signInResultSchema.parse(customerSignInResult.data);
  } catch (e) {
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}

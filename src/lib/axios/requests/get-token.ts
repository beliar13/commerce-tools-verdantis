import { isAxiosError } from 'axios';
import { z } from 'zod';

import { envVariables } from '@/config/commerce-tools-api';

import { authInstance } from '../axios-instances';

const tokenInfoSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string().optional(),
  scope: z.string(),
  token_type: z.string(),
});

type TokenInfo = z.infer<typeof tokenInfoSchema>;

const eSchema = z
  .object({
    response: z.object({
      data: z.object({
        message: z.string(),
      }),
    }),
  })
  .transform((error) => error.response.data.message);

export async function getToken({
  password,
  username,
}: {
  password: string;
  username: string;
}): Promise<TokenInfo> {
  try {
    const tokenInfo = await authInstance.post(
      `/oauth/${envVariables.PROJECT_KEY}/customers/token`,
      {
        grant_type: 'password',
        password,
        username,
      },
      {
        auth: {
          password: envVariables.CLIENT_SECRET,
          username: envVariables.CLIENT_ID,
        },
      },
    );

    return tokenInfoSchema.parse(tokenInfo);
  } catch (e) {
    if (isAxiosError(e)) {
      const message = eSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}

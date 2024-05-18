import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';

import { envVariables } from '@/config/commerce-tools-api';

const mockToken = {
  access_token: 'v-dZ10ZCpvbGfwcFniXqfkAj0vq1yZVI',
  expires_in: 172800,
  refresh_token: `${envVariables.PROJECT_KEY}:OWStLG0eaeVs7Yx3-mHcn8iAZohBohCiJSDdK1UCJ9U`,
  scope: `view_published_products:${envVariables.PROJECT_KEY} manage_my_orders:${envVariables.PROJECT_KEY} manage_my_profile:${envVariables.PROJECT_KEY}`,
  token_type: 'Bearer',
};
export const server = setupServer(
  http.post(`${envVariables.AUTH_URL}/oauth/${envVariables.PROJECT_KEY}/customers/token`, () =>
    HttpResponse.json(mockToken),
  ),
);

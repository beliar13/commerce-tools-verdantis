import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { CartResponse, cartResponseSchema } from './schemas/cart-schema';
export const addLineItemToCart = async (
  BEARER_TOKEN: string,
  cartId: string,
  cartVersion: number,
): Promise<CartResponse> => {
  const query = `/${envVariables.PROJECT_KEY}/me/carts/${cartId}`;

  try {
    const addLineItemResult = await apiInstance.post(
      query,
      {
        actions: [{ action: 'addLineItem', productId: '85e1f1ea-d573-4c2a-881e-21529403f62d', quantity: 1 }],
        version: cartVersion,
      },
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      },
    );
    return cartResponseSchema.parse(addLineItemResult.data);
  } catch (e) {
    console.error('Error occurred while getting adding lineItem to cart:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
};

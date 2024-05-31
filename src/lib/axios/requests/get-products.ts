import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { ProductsRequestArguments } from './catalog-types';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { type Product, getProductsResultSchema } from './schemas/product-schema';

export async function getAllProducts(offset = 0, BEARER_TOKEN: string): Promise<Product[]> {
  const queryArgs: ProductsRequestArguments = { limit: 7, offset };
  const query = `/${envVariables.PROJECT_KEY}/product-projections?limit=${queryArgs.limit}`;
  try {
    const getProductsResult = await apiInstance.get(query, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return getProductsResultSchema.parse(getProductsResult.data).results;
  } catch (e) {
    console.error('Error occured while getting products:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}

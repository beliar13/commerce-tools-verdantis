import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { ProductsRequestArguments } from './catalog-types';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { type Product, getProductsResultSchema } from './schemas/product-schema';

// const query = `/${envVariables.PROJECT_KEY}/product-projections?limit=${queryArgs.limit}&filter=categories.id:"${category}"`;

export async function getProductsByCategory(
  categoryId: string,
  offset = 0,
  BEARER_TOKEN: string,
): Promise<Product[]> {
  const queryArgs: ProductsRequestArguments = { limit: 7, offset };
  const query = `/${envVariables.PROJECT_KEY}/product-projections?limit=${queryArgs.limit}&offset=${queryArgs.offset}&where=categories(id%3D"${categoryId}")`;
  try {
    const getProductsResult = await apiInstance.get(query, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    console.log('products', getProductsResult);
    return getProductsResultSchema.parse(getProductsResult.data).results;
  } catch (e) {
    console.error('Error occurred while getting products:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}

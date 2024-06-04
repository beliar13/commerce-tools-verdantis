import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { ProductsRequestArguments } from './catalog-types';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { type Product, getProductsResultSchema } from './schemas/product-schema';

export async function getFilteredProducts(offset = 0, BEARER_TOKEN: string, filters: string): Promise<Product[]> {
  const queryArgs: ProductsRequestArguments = { limit: 7, offset };
  const query = `/${envVariables.PROJECT_KEY}/product-projections/search?limit=${queryArgs.limit}&offset=${queryArgs.offset}&${filters}`;
  // console.log(`complete query without encode: ${query}`);

  try {
    const getProductsResult = await apiInstance.get(query, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
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

export const buildQueryString = (params: IterableIterator<[string, string]>): string => {
  const result: string[] = [];
  for (const [key, value] of params) {
    if (!value) {
      continue;
    }
    if (key === 'category') {
      const query = `filter=categories.id: subtree("${value}")`;
      result.push(query);
    } else {
      result.push(`filter=variants.attributes.${encodeURIComponent(key)}:"${encodeURIComponent(value)}"`);
    }
  }
  return result.join('&');
};

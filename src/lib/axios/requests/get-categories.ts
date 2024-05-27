import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import {
  CategoriesRequestArguments,
  Category,
  categoriesResponsesSchema,
} from './schemas/get-categories-schema';

export async function getAllProducts(offset = 0, BEARER_TOKEN: string): Promise<Category[]> {
  const queryArgs: CategoriesRequestArguments = { limit: 7, offset };
  const query = `/${envVariables.PROJECT_KEY}/product-projections?limit=${queryArgs.limit}`;
  try {
    const getCategoriesResult = await apiInstance.get(query, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return categoriesResponsesSchema.parse(getCategoriesResult.data).results;
  } catch (e) {
    console.error('Error occured while getting products:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import {
  type CategoriesRequestArguments,
  type Category,
  categoriesResponseSchema,
} from './schemas/get-categories-schema';

export const getCategories = async (offset = 0, BEARER_TOKEN: string): Promise<Category[]> => {
  const queryArgs: CategoriesRequestArguments = { limit: 7, offset };
  const query = `/${envVariables.PROJECT_KEY}/categories?limit=${queryArgs.limit}`;
  try {
    const getCategoriesResult = await apiInstance.get(query, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });
    return categoriesResponseSchema.parse(getCategoriesResult.data).results;
  } catch (e) {
    console.error('Error occurred while getting categories:', e);
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
};

// https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

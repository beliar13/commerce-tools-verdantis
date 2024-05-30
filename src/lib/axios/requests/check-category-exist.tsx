import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { apiInstance } from '../axios-instances';
import { ProductsRequestArguments } from './catalog-types';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';

export async function checkIfCategoryExist(
  category: string,
  BEARER_TOKEN: string,
): Promise<boolean> {
  const queryArgs: ProductsRequestArguments = { limit: 1 };
  const query = `/${envVariables.PROJECT_KEY}/product-projections?limit=${queryArgs.limit}&where=categories(id="${category}")`;
  try {
    await apiInstance.get(query, {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    });

    return true;
  } catch (e) {
    console.error('Error occured while getting products:', e);
    if (isAxiosError(e)) {
      if (e.response?.status === 404) {
        return false;
      }
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}

// export async function getProductsOfCategory(
//   id: string,
//   offset = 0
// ): Promise<ProductProjectionPagedQueryResponse | null> {
//   const queryArgs = {
//     where: `categories(id="${id}")`,
//     limit: productsPerPage,
//     offset,
//   };
//   try {
//     const request = await getApiRoot().productProjections().get({ queryArgs }).execute();
//     const products = request.body;
//     return products;
//   } catch (err) {
//     console.error(errorMessage);
//     return null;
//   }
// }

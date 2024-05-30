import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Stack } from '@mui/material';

import type { Product } from '@/lib/axios/requests/schemas/product-schema';

import { CategoriesNavigation } from '@/components/catalog/catalog-navigation/catalog-navigation';
import { CatalogItem } from '@/features/catalog/catalog-item/';
import { CatalogWrapper } from '@/features/catalog/catalog-wrapper';
import { checkIfCategoryExist } from '@/lib/axios/requests/check-category-exist';
import { getAllProducts } from '@/lib/axios/requests/get-products';
import { getProductsByCategory } from '@/lib/axios/requests/get-products-by-category';
import { useTokenStore } from '@/stores/token-store';

const CatalogPage: FC = () => {
  const { token } = useTokenStore();
  const [products, setProducts] = useState<Product[] | null>(null);
  if (!token) {
    throw new Error('Token expected');
  }
  const location = useLocation();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const categoryId = urlSearchParams.get('category');

    if (categoryId) {
      console.log('categoryId', categoryId);
      checkIfCategoryExist(categoryId, token).then(
        () => {
          getProductsByCategory(categoryId, 0, token).then(
            (products: Product[]) => {
              setProducts(products);
            },
            (error) => {
              console.error(error);
            },
          );
        },
        (err) => console.error(err),
      );
    } else {
      console.log('no category selected');
      getAllProducts(0, token).then(
        (products: Product[]) => {
          setProducts(products);
        },
        (error) => {
          console.error(error);
        },
      );
    }
  }, [token, location]);

  return (
    <CatalogWrapper>
      <Stack className={'flex-row justify-between'}>
        <CategoriesNavigation />
        {products ? (
          <Stack className="my-auto  flex w-3/4 flex-row flex-wrap gap-2">
            {products.map((product: Product) => {
              return <CatalogItem key={`${product.key}`} product={product} />;
            })}
          </Stack>
        ) : (
          <Stack className="mx-0 my-auto w-full">No data available. Try to reload the page</Stack>
        )}
      </Stack>
    </CatalogWrapper>
  );
};

export default CatalogPage;

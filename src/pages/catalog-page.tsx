import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Stack, Typography } from '@mui/material';

import type { Product } from '@/lib/axios/requests/schemas/product-schema';

import { CatalogItem } from '@/features/catalog/catalog-item/';
import { CatalogWrapper } from '@/features/catalog/catalog-wrapper';
import { CategoriesNavigation } from '@/features/catalog/categories-navigation';
import { buildQueryString, getFilteredProducts } from '@/lib/axios/requests/catalog/get-filtered-products';
import { getAllProducts } from '@/lib/axios/requests/get-products';
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

    const allSearchParams = urlSearchParams.entries();
    const filtersQueryString = buildQueryString(allSearchParams);
    if (filtersQueryString.length > 0) {
      getFilteredProducts(0, token, filtersQueryString).then(
        (products: Product[]) => {
          setProducts(products);
        },
        (error) => {
          console.error(error);
        },
      );
    } else {
      handleGetAllProducts(token, setProducts);
    }
  }, [token, location]);

  return (
    <CatalogWrapper>
      <Stack
        className={' flex-row justify-between align-middle'}
        sx={{ margin: { lg: '2% 5%', md: '2% 4%', sm: '1% 2%', xs: '1%' } }}
      >
        <CategoriesNavigation />
        {products && products.length > 0 ? (
          <Stack className="mb-auto  flex w-3/4 flex-row flex-wrap justify-center gap-2">
            {products.map((product: Product) => {
              return <CatalogItem key={`${product.key}`} product={product} />;
            })}
          </Stack>
        ) : (
          <Typography className="p-5" component={'h2'} variant="h3">
            No data available. Try to reload the page
          </Typography>
        )}
      </Stack>
    </CatalogWrapper>
  );
};

export default CatalogPage;

const handleGetAllProducts = (
  token: string,
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>,
): void => {
  getAllProducts(0, token).then(
    (products: Product[]) => {
      setProducts(products);
    },
    (error) => {
      console.error(error);
    },
  );
};

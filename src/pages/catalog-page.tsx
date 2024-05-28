import { FC, useEffect, useState } from 'react';

import { Stack } from '@mui/material';

import type { Product } from '@/lib/axios/requests/schemas/product-schema';

import { CatalogItem } from '@/features/catalog/catalog-item/';
import { CatalogWrapper } from '@/features/catalog/catalog-wrapper';
import { getAllProducts } from '@/lib/axios/requests/get-products';
import { useTokenStore } from '@/stores/token-store';

const CatalogPage: FC = () => {
  const { token } = useTokenStore();
  const [products, setProducts] = useState<Product[] | null>(null);
  if (!token) {
    throw new Error('Token expected');
  }
  useEffect(() => {
    getAllProducts(0, token).then(
      (products: Product[]) => {
        setProducts(products);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [token]);

  return (
    <CatalogWrapper>
      {products ? (
        <Stack className="my-auto  flex w-full flex-row flex-wrap gap-2">
          {products.map((product: Product) => {
            return <CatalogItem key={`${product.key}`} product={product} />;
          })}
        </Stack>
      ) : (
        <Stack className="mx-0 my-auto w-full">No data available. Try to reload the page</Stack>
      )}
    </CatalogWrapper>
  );
};

export default CatalogPage;

import { FC } from 'react';

import { Stack, Typography } from '@mui/material';

import { getCart } from '@/lib/axios/requests/get-cart';
import { useTokenStore } from '@/stores/token-store';

export const CartPage: FC = () => {
  const { token } = useTokenStore();
  if (!token) {
    throw new Error('Token expected');
  }

  getCart(token).then(
    (res) => console.log('got cart:', res),
    (err) => console.error(err),
  );

  return (
    <Stack
      className={' flex-row justify-between align-middle'}
      sx={{ margin: { lg: '2% 5%', md: '2% 4%', sm: '1% 2%', xs: '1%' } }}
    >
      <Typography>Cart</Typography>
      {/* {products && products.length > 0 ? (
          <Stack className="mb-auto  flex w-3/4 flex-row flex-wrap justify-center gap-2">
            {products.map((product: Product) => {
              return <CatalogItem key={`${product.key}`} product={product} />;
            })}
          </Stack>
        ) : (
          <Stack className="mx-0 my-auto w-full">No data available. Try to reload the page</Stack>
        )} */}
    </Stack>
  );
};

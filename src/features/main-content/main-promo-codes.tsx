import { FC } from 'react';

import { Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getProductById } from '@/lib/axios/requests/get-product-by-id';
import { useTokenStore } from '@/stores/token-store';

import { PromoCode } from './promo-code';

export const MainPromoCodes: FC = () => {
  const { token } = useTokenStore();
  const bouquetProductId = '85e1f1ea-d573-4c2a-881e-21529403f62d';
  const forEverythingProductId = '2848d327-31bf-4ce0-86d7-a5259d464e5a';

  const { data: bouquet } = useQuery({
    queryFn: () => getProductById(bouquetProductId, token),
    queryKey: ['product', bouquetProductId, token],
    throwOnError: true,
  });
  const { data: forEverything } = useQuery({
    queryFn: () => getProductById(forEverythingProductId, token),
    queryKey: ['product', forEverythingProductId, token],
    throwOnError: true,
  });

  return (
    <Stack>
      <Typography className="text-center" sx={{ fontSize: { lg: '55px', md: '45px', xs: '35px' } }}>
        Promo codes
      </Typography>

      <Stack className="flex flex-row flex-wrap justify-center gap-4 p-5">
        <PromoCode description="- 20% discount on bouquets" product={bouquet} text="BLOOMING20" />
        <PromoCode description="- 10% discount for everyone and everything" product={forEverything} text="PLANTJOY10" />
      </Stack>
    </Stack>
  );
};

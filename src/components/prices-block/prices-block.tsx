import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { PriceBlockProps } from './prices-block.types';

export const PricesBlock: FC<PriceBlockProps> = ({ price }) => {
  if (!price) {
    return <Typography variant="body1">Price unavailable</Typography>;
  }
  const { discounted, value } = price;
  const formatPrice = (amount: number, currencyCode: string, fractionDigits: number): string => {
    return new Intl.NumberFormat('en-US', {
      currency: currencyCode,
      minimumFractionDigits: fractionDigits,
      style: 'currency',
    }).format(amount / Math.pow(10, fractionDigits));
  };

  return (
    <Box>
      {discounted ? (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography sx={{ color: 'grey.600', textDecoration: 'line-through' }} variant="body1">
            {formatPrice(value.centAmount, value.currencyCode, value.fractionDigits)}
          </Typography>
          <Typography color="secondary" variant="body1">
            {formatPrice(discounted.value.centAmount, discounted.value.currencyCode, discounted.value.fractionDigits)}
          </Typography>
        </Box>
      ) : (
        <Typography sx={{ color: 'rgba(238, 238, 238, 0.87)' }} variant="body1">
          {formatPrice(value.centAmount, value.currencyCode, value.fractionDigits)}
        </Typography>
      )}
    </Box>
  );
};

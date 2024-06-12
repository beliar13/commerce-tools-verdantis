import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { TotalPriceProps } from './total-price-block.types';

export const TotalPricesBlock: FC<TotalPriceProps> = ({ totalPrice }) => {
  if (!totalPrice) {
    return <Typography variant="body1">0</Typography>;
  }
  const formatPrice = (amount: number, currencyCode: string, fractionDigits: number): string => {
    return new Intl.NumberFormat('en-US', {
      currency: currencyCode,
      minimumFractionDigits: fractionDigits,
      style: 'currency',
    }).format(amount / Math.pow(10, fractionDigits));
  };

  return (
    <Box>
      <Typography variant="body1">
        Total: {formatPrice(totalPrice.centAmount, totalPrice.currencyCode, totalPrice.fractionDigits)}
      </Typography>
    </Box>
  );
};

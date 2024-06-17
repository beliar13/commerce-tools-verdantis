import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { DiscountedPriceWithTotal } from './discounted-price-with-total';
import { GeneralPrice } from './general-price';
import { GeneralPriceWithTotal } from './general-price-with-total';
import { DiscountedPriceProps, PriceBlockProps } from './prices-block.types';

export const PricesBlock: FC<PriceBlockProps> = ({ price, styleDiscount, stylePrice, totalPrice }) => {
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

  if (totalPrice && discounted) {
    return (
      <DiscountedPriceWithTotal
        discounted={discounted}
        formatPrice={formatPrice}
        styleDiscount={styleDiscount}
        stylePrice={stylePrice}
        totalPrice={totalPrice}
        value={value}
      />
    );
  }
  if (discounted) {
    return (
      <DiscountedPrice
        discounted={discounted}
        formatPrice={formatPrice}
        styleDiscount={styleDiscount}
        stylePrice={stylePrice}
        value={value}
      />
    );
  }
  if (!discounted && totalPrice) {
    return (
      <GeneralPriceWithTotal
        formatPrice={formatPrice}
        styleDiscount={styleDiscount}
        stylePrice={stylePrice}
        totalPrice={totalPrice}
        value={value}
      />
    );
  }
  if (!discounted && !totalPrice) {
    return <GeneralPrice formatPrice={formatPrice} stylePrice={stylePrice} value={value} />;
  }
};

const DiscountedPrice: FC<DiscountedPriceProps> = ({ discounted, formatPrice, styleDiscount, stylePrice, value }) => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Typography sx={styleDiscount} variant="body1">
      {formatPrice(value.centAmount, value.currencyCode, value.fractionDigits)}
    </Typography>
    <Typography color={stylePrice} variant="body1">
      {formatPrice(discounted.value.centAmount, discounted.value.currencyCode, discounted.value.fractionDigits)}
    </Typography>
  </Box>
);

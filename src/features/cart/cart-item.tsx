import { Card, Typography } from '@mui/material';

import { AddedProductData } from '@/pages/cart-page';

export const CartItem = ({ product, quantity }: AddedProductData): JSX.Element => {
  const { images, name } = product;
  const firstImageIndex = 0;
  const image = images[firstImageIndex];
  return (
    <Card
      className="flex flex-col justify-between p-5"
      sx={{
        ':hover': { bgcolor: 'primary.light', transition: '2s' },
        backgroundColor: 'primary.contrastText',
        textDecoration: 'none',
        transition: '2s',
        width: { lg: '25%', md: '33%', sm: '70%', xs: '100%' },
      }}
      variant="outlined"
    >
      <img alt={name} className={'align-self-start w-full '} src={image.url} />

      <Typography
        className="my-3  text-center"
        sx={{ fontSize: { lg: '20px', md: '18px', xs: '16px' }, fontWeight: 600 }}
      >
        {name}
      </Typography>
      <Typography
        className="my-3  text-center"
        sx={{ fontSize: { lg: '20px', md: '18px', xs: '16px' }, fontWeight: 600 }}
      >
        {quantity}
      </Typography>
    </Card>
  );
};

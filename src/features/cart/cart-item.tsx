import { MutableRefObject } from 'react';

import { Button, Card, Typography } from '@mui/material';

import { removeLineItemFromCart } from '@/lib/axios/requests/remove-line-item-from-cart';
import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { AddedProductData } from '@/pages/cart-page';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

interface CartItemData extends AddedProductData {
  setterForCartRef: MutableRefObject<(cart: CartResponse) => void>;
}

const handleRemoveProduct = (
  token: string,
  cart: CartResponse,
  lineItemId: string,
  setterForCartRef: MutableRefObject<(cart: CartResponse) => void>,
): void => {
  const setCart = setterForCartRef.current;
  removeLineItemFromCart(token, cart.id, lineItemId, cart.version).then(
    (res) => {
      setCart(res);
    },
    (err) => console.error(err),
  );
};

export const CartItem = ({ lineItemId, product, quantity, setterForCartRef }: CartItemData): JSX.Element => {
  const { cart } = useCartStore();
  const { token } = useTokenStore();
  const { images, name } = product;
  const firstImageIndex = 0;
  const image = images[firstImageIndex];
  return (
    <Card
      className="flex flex-col justify-between p-5"
      id={lineItemId}
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
      <Button
        id={lineItemId}
        onClick={(e) => {
          const eventTarget = e.target;
          if (!(eventTarget instanceof HTMLButtonElement)) {
            throw new Error('Button expected');
          }
          if (!token) {
            throw new Error('Token expected');
          }
          if (!cart) {
            throw new Error('Cart expected');
          }
          handleRemoveProduct(token, cart, eventTarget.id, setterForCartRef);
        }}
      >
        remove product
      </Button>
    </Card>
  );
};

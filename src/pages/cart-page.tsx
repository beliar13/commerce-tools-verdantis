import { FC, useRef } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { addLineItemToCart } from '@/lib/axios/requests/add-line-item-to-cart';
// import { getCart } from '@/lib/axios/requests/get-cart';
import { LineItem } from '@/lib/axios/requests/schemas/line-item-schema';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

export const CartPage: FC = () => {
  const { token } = useTokenStore();
  const { cart, setCart } = useCartStore();

  if (!token) {
    throw new Error('Token expected');
  }

  if (!cart) {
    throw new Error('Cart expected');
  }

  const setterForCartRef = useRef(setCart);

  // useEffect(() => {
  //   const setCart = setterForCartRef.current;
  //   getCart(token).then(
  //     (res) => {
  //       setCart(res);
  //     },
  //     (err) => console.error(err),
  //   );
  // }, [token]);

  const handleAddLineItem = (): void => {
    const setCart = setterForCartRef.current;
    addLineItemToCart(token, cart.id, cart.version).then(
      (res) => {
        console.log(res);
        setCart(res);
      },
      (err) => console.error(err),
    );
  };

  return (
    <Stack
      className={' flex-row justify-between align-middle'}
      sx={{ margin: { lg: '2% 5%', md: '2% 4%', sm: '1% 2%', xs: '1%' } }}
    >
      <Typography>Cart</Typography>
      <Button onClick={handleAddLineItem}>Add lineItem</Button>
      {cart?.lineItems && cart?.lineItems.length > 0 ? (
        <Stack className="mb-auto  flex w-3/4 flex-row flex-wrap justify-center gap-2">
          {cart?.lineItems.map((lineItem: LineItem) => {
            return <Stack key={`${lineItem.key}`} />;
          })}
        </Stack>
      ) : (
        <Stack className="mx-0 my-auto w-full">No data available. Try to reload the page</Stack>
      )}
    </Stack>
  );
};

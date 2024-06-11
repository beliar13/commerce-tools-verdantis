import { MutableRefObject } from 'react';

import { Button } from '@mui/material';

import { removeLineItemFromCart } from '@/lib/axios/requests/remove-line-item-from-cart';
import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

type SetterForCartRef = MutableRefObject<(cart: CartResponse) => void>;
type ClearCartData = {
  cart: CartResponse;
  setterForCartRef: SetterForCartRef;
  token: string;
};

const handleClearCart = ({ cart, setterForCartRef, token }: ClearCartData): void => {
  const lineItems = cart.lineItems;
  lineItems.forEach((lineItem) => {
    handleRemoveProduct(token, cart, lineItem.id, setterForCartRef);
  });
};

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

export const ClearCart = ({ setterForCartRef }: { setterForCartRef: SetterForCartRef }): JSX.Element => {
  const { cart } = useCartStore();
  const { token } = useTokenStore();
  if (!token || !cart) {
    throw new Error('Token and cart expected');
  }
  return <Button onClick={() => handleClearCart({ cart, setterForCartRef, token })}>clear cart</Button>;
};

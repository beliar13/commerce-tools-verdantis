import { useState } from 'react';
import { type FC, MutableRefObject } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { LineItem } from '@/lib/axios/requests/schemas/line-item-schema';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

import { handleRemoveProduct } from './handle-remove-product';

type ClearCartData = {
  cart: CartResponse;
  setterForCartRef: SetterForCartRef;
  token: string;
};

export type SetterForCartRef = MutableRefObject<(cart: CartResponse) => void>;

export const ClearCart: FC<{ setterForCartRef: SetterForCartRef }> = ({ setterForCartRef }) => {
  const { cart } = useCartStore();
  const { token } = useTokenStore();

  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleCancel = (): void => {
    setOpen(false);
  };

  const handleClearCart = ({ cart, setterForCartRef, token }: ClearCartData): void => {
    if (!token || !cart) {
      throw new Error('Token and cart expected');
    }
    const lineItems = cart.lineItems;
    lineItems.forEach((lineItem: LineItem) => {
      handleRemoveProduct(token, cart, lineItem.id, setterForCartRef);
    });
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} variant="outlined">
        Open alert dialog
      </Button>
      <Dialog
        aria-describedby="alert-dialog-description"
        aria-labelledby="alert-dialog-title"
        onClose={handleCancel}
        open={open}
      >
        <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: 'primary.light' }}>
          {'Clear cart'}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: 'primary.light' }}>
          <DialogContentText id="alert-dialog-description">Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: 'primary.main' }}>
          <Button onClick={handleCancel} sx={{ color: 'primary.contrastText' }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (!token || !cart) {
                throw new Error('Token and cart expected');
              }
              handleClearCart({ cart, setterForCartRef, token });
            }}
            sx={{ color: 'primary.contrastText' }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

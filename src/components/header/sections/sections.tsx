import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button, Stack } from '@mui/material';

import { useCartStore } from '@/stores/cart-store';

import { sectionsLabels } from '../navigation.constants';

export const Sections: FC = () => {
  const cart = useCartStore((state) => state.cart);
  return (
    <Stack direction={'row'}>
      {sectionsLabels.map((label) =>
        label === 'cart' ? (
          <Button component={RouterLink} key={label} to={label}>
            {label}
            <ShoppingCartOutlinedIcon data-testid="cart-icon" />
            <span data-testid="cart-items-count">
              {cart?.lineItems.reduce((sum, item) => item.quantity + sum, 0) ?? 0}
            </span>
          </Button>
        ) : (
          <Button component={RouterLink} key={label} to={label}>
            {label}
          </Button>
        ),
      )}
    </Stack>
  );
};

import { MutableRefObject } from 'react';

import { Box, Button, Card, Typography } from '@mui/material';

import { ChangeQuantityButton } from '@/components/change-quantity-button/change-quantity-button';
import { PricesBlock } from '@/components/prices-block/prices-block';
import {
  discountPriceStyleCatalog,
  firstVariantPrice,
  stylePriceCatalog,
} from '@/features/catalog/catalog-item/catalog-item.constants';
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

export const CartItem = ({ lineItem, lineItemId, quantity, setterForCartRef }: CartItemData): JSX.Element => {
  const { cart } = useCartStore();
  const { token } = useTokenStore();
  const { name, totalPrice, variant } = lineItem;

  const enName = name['en-US'];
  const firstImageIndex = 0;
  const image = variant ? variant.images[firstImageIndex] : { name: 'placeholder', url: '' };
  const { prices } = variant;
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
      <img alt={enName} className={'align-self-start w-full '} src={image.url} />

      <Typography
        className="my-3  text-center"
        sx={{ fontSize: { lg: '20px', md: '18px', xs: '16px' }, fontWeight: 600 }}
      >
        {enName}
      </Typography>

      <PricesBlock
        price={prices[firstVariantPrice]}
        styleDiscount={discountPriceStyleCatalog}
        stylePrice={stylePriceCatalog}
        totalPrice={totalPrice}
      />
      <Box className="flex flex-row items-center justify-between">
        <ChangeQuantityButton action="-" currentQuantity={quantity} productId={lineItemId} />
        <Typography
          className="my-3  text-center"
          sx={{ fontSize: { lg: '20px', md: '18px', xs: '16px' }, fontWeight: 600 }}
        >
          {quantity}
        </Typography>
        <ChangeQuantityButton action="+" currentQuantity={quantity} productId={lineItemId} />
      </Box>
      <Button
        onClick={() => {
          if (!token) {
            throw new Error('Token expected');
          }
          if (!cart) {
            throw new Error('Cart expected');
          }
          handleRemoveProduct(token, cart, lineItemId, setterForCartRef);
        }}
      >
        remove product
      </Button>
    </Card>
  );
};

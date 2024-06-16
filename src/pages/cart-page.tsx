import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { BackTo } from '@/components/back-to/back-to';
import { TotalPricesBlock } from '@/components/total-price-block/total-price-block';
import { CartItem } from '@/features/cart';
import { ClearCart } from '@/features/cart/clear-cart/clear-cart';
import { PromocodeForm } from '@/features/promocod-form/promocode-form';
import { LineItem } from '@/lib/axios/requests/schemas/line-item-schema';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

export type AddedProductData = {
  lineItem: LineItem;
  lineItemId: string;
  quantity: number;
};

const getProductsAddedToCart = async (
  lineItems: LineItem[],
  setProducts: Dispatch<SetStateAction<[] | AddedProductData[]>>,
): Promise<void> => {
  const productsAddedToCart: AddedProductData[] = [];
  await Promise.all(
    lineItems.map((lineItem: LineItem) => {
      const { id, productId, quantity } = lineItem;
      if (productId && quantity) {
        productsAddedToCart.push({ lineItem: lineItem, lineItemId: id, quantity });
      }
    }),
  );
  setProducts(productsAddedToCart);
};

export const CartPage: FC = () => {
  const { token } = useTokenStore();
  const { cart, setCart } = useCartStore();
  const [products, setProducts] = useState<[] | AddedProductData[]>([]);
  const setterForCartRef = useRef(setCart);
  useEffect(() => {
    if (!cart) {
      return;
    }
    const lineItems = cart.lineItems ? cart.lineItems : [];
    setProducts([]);
    if (lineItems.length > 0) {
      if (!token) {
        throw new Error('Token expected');
      }
      void getProductsAddedToCart(lineItems, setProducts);
    }
  }, [token, cart]);

  return (
    <Stack className="flex-col justify-between align-middle">
      <Typography component="h1" variant="h2">
        Cart
      </Typography>
      <ClearCart setterForCartRef={setterForCartRef} />
      {products.length > 0 ? (
        <Stack className="mb-auto  flex w-3/4 flex-row flex-wrap justify-center gap-2">
          {products.map((addedProduct: AddedProductData) => {
            const { lineItem: product, lineItemId, quantity } = addedProduct;
            return (
              <CartItem
                key={product.id}
                lineItem={product}
                lineItemId={lineItemId}
                quantity={quantity}
                setterForCartRef={setterForCartRef}
              />
            );
          })}

          <>
            <PromocodeForm />

            <TotalPricesBlock discountOnTotalPrice={cart?.discountOnTotalPrice} totalPrice={cart?.totalPrice} />
            <Button className="my-auto block" variant="contained">
              Checkout
            </Button>
          </>
        </Stack>
      ) : (
        <>
          <Stack className="mx-0 my-auto w-full">No products.</Stack>
          <BackTo dest="catalog" path="/catalog" />
        </>
      )}
    </Stack>
  );
};

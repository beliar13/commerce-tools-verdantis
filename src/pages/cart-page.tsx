import { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { CartItem } from '@/features/cart';
import { addLineItemToCart } from '@/lib/axios/requests/add-line-item-to-cart';
import { getProductById } from '@/lib/axios/requests/get-product-by-id';
import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { LineItem } from '@/lib/axios/requests/schemas/line-item-schema';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

import { Product } from './product-page.types';

const handleAddLineItem = (
  token: string,
  cart: CartResponse,
  setterForCartRef: MutableRefObject<(cart: CartResponse) => void>,
): void => {
  const setCart = setterForCartRef.current;
  addLineItemToCart(token, cart.id, cart.version).then(
    (res) => {
      console.log(res);
      setCart(res);
    },
    (err) => console.error(err),
  );
};

export type AddedProductData = {
  product: Product;
  quantity: number;
};

const getProductsAddedToCart = async (
  lineItems: LineItem[],
  token: string,
  setProducts: Dispatch<SetStateAction<[] | AddedProductData[]>>,
): Promise<void> => {
  const productsAddedToCart: AddedProductData[] = [];
  await Promise.all(
    lineItems.map(async (lineItem: LineItem) => {
      if (lineItem.productId && lineItem.quantity) {
        try {
          const product = await getProductById(lineItem.productId, token);
          productsAddedToCart.push({ product, quantity: lineItem.quantity });
        } catch (err) {
          console.error(err);
        }
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
    const lineItems = cart ? cart?.lineItems : [];
    if (lineItems.length > 0) {
      if (!token) {
        throw new Error('Token expected');
      }
      getProductsAddedToCart(lineItems, token, setProducts).then(
        () => {},
        () => {},
      );
    } else {
      console.log('no lineItems');
    }
  }, [token, cart]);

  return (
    <Stack className={' flex-col justify-between align-middle'}>
      <Typography>Cart</Typography>
      <Button
        onClick={() => {
          if (!token) {
            throw new Error('Token expected');
          }
          if (!cart) {
            throw new Error('Cart expected');
          }
          handleAddLineItem(token, cart, setterForCartRef);
        }}
      >
        Add lineItem
      </Button>
      {products.length > 0 ? (
        <Stack className="mb-auto  flex w-3/4 flex-row flex-wrap justify-center gap-2">
          {products.map((addedProduct: AddedProductData) => {
            return (
              <CartItem
                key={addedProduct.product.name}
                product={addedProduct.product}
                quantity={addedProduct.quantity}
              />
            );
          })}
        </Stack>
      ) : (
        <Stack className="mx-0 my-auto w-full">No data available. Try to reload the page</Stack>
      )}
    </Stack>
  );
};

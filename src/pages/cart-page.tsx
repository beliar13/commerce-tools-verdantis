import { Dispatch, FC, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { BackTo } from '@/components/back-to/back-to';
import { CartItem } from '@/features/cart';
import { getProductById } from '@/lib/axios/requests/get-product-by-id';
import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { LineItem } from '@/lib/axios/requests/schemas/line-item-schema';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

import { Product } from './product-page.types';

export type AddedProductData = {
  lineItemId: string;
  product: Product;
  quantity: number;
};

export interface CardData extends AddedProductData {
  setterForCartRef: MutableRefObject<(cart: CartResponse) => void>;
}

const getProductsAddedToCart = async (
  lineItems: LineItem[],
  token: string,
  setProducts: Dispatch<SetStateAction<[] | AddedProductData[]>>,
): Promise<void> => {
  const productsAddedToCart: AddedProductData[] = [];
  await Promise.all(
    lineItems.map(async (lineItem: LineItem) => {
      const { id, productId, quantity } = lineItem;
      if (productId && quantity) {
        try {
          const product = await getProductById(productId, token);
          productsAddedToCart.push({ lineItemId: id, product, quantity });
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
    setProducts([]);
    if (lineItems.length > 0) {
      if (!token) {
        throw new Error('Token expected');
      }
      getProductsAddedToCart(lineItems, token, setProducts).then(
        () => {},
        () => {},
      );
    }
  }, [token, cart]);

  return (
    <Stack className={' flex-col justify-between align-middle'}>
      <Typography>Cart</Typography>
      {products.length > 0 ? (
        <Stack className="mb-auto  flex w-3/4 flex-row flex-wrap justify-center gap-2">
          {products.map((addedProduct: AddedProductData) => {
            const { lineItemId, product, quantity } = addedProduct;
            return (
              <CartItem
                key={product.name}
                lineItemId={lineItemId}
                product={product}
                quantity={quantity}
                setterForCartRef={setterForCartRef}
              />
            );
          })}
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

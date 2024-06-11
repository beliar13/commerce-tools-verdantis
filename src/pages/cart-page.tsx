import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { BackTo } from '@/components/back-to/back-to';
import { CartItem } from '@/features/cart';
import { ClearCart } from '@/features/cart/clear-cart/clear-cart';
import { getProductById } from '@/lib/axios/requests/get-product-by-id';
import { LineItem } from '@/lib/axios/requests/schemas/line-item-schema';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

import { Product } from './product-page.types';

export type AddedProductData = {
  lineItemId: string;
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
      void getProductsAddedToCart(lineItems, token, setProducts);
    }
  }, [token, cart]);

  return (
    <Stack className={' flex-col justify-between align-middle'}>
      <Typography component={'h1'} variant="h2">
        Cart
      </Typography>
      <ClearCart setterForCartRef={setterForCartRef} />
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

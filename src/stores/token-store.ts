import { useEffect } from 'react';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { createCart } from '@/lib/axios/requests/create-cart';
import { getAnonymousToken } from '@/lib/axios/requests/get-anonymous-token';
import { type CartResponse } from '@/lib/axios/requests/schemas/cart-schema';

import { useCartStore } from './cart-store';

type Token = null | string;

type TokenType = 'anonymous' | 'password' | null;

type TokenState = {
  fetchAnonToken: () => Promise<void>;
  resetStore: () => Promise<void>;
  setToken: (state: { token: Token; type: TokenType }) => void;
  token: Token;
  type: TokenType;
};

export const useTokenStore = create<TokenState>()(
  devtools(
    persist(
      (set, get) => ({
        fetchAnonToken: async () => {
          if (get().token === null) {
            const tokenInfo = await getAnonymousToken();
            get().setToken({ token: tokenInfo.access_token, type: 'anonymous' });
          }
        },
        resetStore: async () => {
          set({ token: null, type: null });
          await get().fetchAnonToken();
        },
        setToken: ({ token, type }) => set({ token, type }),
        token: null,
        type: null,
      }),
      { name: 'verdantisToken' },
    ),
  ),
);

export const useInitTokenStore = (): void => {
  const { fetchAnonToken, token } = useTokenStore();
  const { setCart } = useCartStore();
  const cartStore = useCartStore();
  useEffect(() => {
    fetchAnonToken().catch((e) => {
      console.log(e);
    });
    if (!token) {
      throw new Error('Token expected');
    }
    if (!cartStore.cart) {
      createCart(token).then(
        (res: CartResponse) => {
          setCart(res);
        },
        (err) => console.error(err),
      );
    }
  }, [fetchAnonToken, setCart, token, cartStore.cart]);
};

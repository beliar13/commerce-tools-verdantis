import { useEffect } from 'react';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { getAnonymousToken } from '@/lib/axios/requests/get-anonymous-token';

type Token = null | string;

type TokenType = 'anonymous' | 'password' | null;

type TokenState = {
  fetchAnonToken: () => Promise<void>;
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
        setToken: ({ token, type }) => set({ token, type }),
        token: null,
        type: null,
      }),
      { name: 'verdantisToken' },
    ),
  ),
);

export const useInitTokenStore = (): void => {
  const { fetchAnonToken } = useTokenStore();
  useEffect(() => {
    fetchAnonToken().catch((e) => {
      console.log(e);
    });
  }, [fetchAnonToken]);
};

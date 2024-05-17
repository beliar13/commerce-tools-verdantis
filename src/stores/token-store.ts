import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Token = null | string;

type TokenType = 'anonymous' | 'password' | null;

type TokenState = {
  setToken: (state: { token: Token; type: TokenType }) => void;
  token: Token;
  type: TokenType;
};

export const useTokenStore = create<TokenState>()(
  devtools(
    persist(
      (set) => ({
        setToken: ({ token, type }) => set({ token, type }),
        token: null,
        type: null,
      }),
      { name: 'verdantisToken' },
    ),
  ),
);

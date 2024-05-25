import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { Customer } from '@/lib/axios/requests/schemas/customer.schema';
import { SignInResult } from '@/lib/axios/requests/schemas/sign-in-result.schema';

type CustomerState = {
  cart: unknown;
  customer: Customer | null;
  resetStore: () => void;
  setCustomer: (customerInfo: SignInResult) => void;
};

export const useCustomerStore = create<CustomerState>()(
  devtools(
    persist(
      (set) => ({
        cart: null,
        customer: null,
        resetStore: () => {
          set({ customer: null });
        },
        setCustomer: ({ cart, customer }) => set({ cart, customer }),
      }),
      { name: 'verdantisCustomer' },
    ),
  ),
);

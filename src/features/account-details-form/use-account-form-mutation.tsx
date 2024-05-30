import { useState } from 'react';

import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { Customer } from '@/lib/axios/requests/schemas/customer.schema.ts';
import { updateCustomer } from '@/lib/axios/requests/update-customer/update-request.ts';
import { useCustomerStore } from '@/stores/customer-store.ts';
import { useTokenStore } from '@/stores/token-store.ts';

import { AccountDetails } from './account-details.schema.ts';
import { getRequestBody } from './get-request-body.tsx';

export function useAccountFormMutation(
  onSubmit: () => void,
): [UseMutationResult<Customer, Error, AccountDetails>, string] {
  const token = useTokenStore().token;
  const customerStore = useCustomerStore();
  const [errorMessage, setErrorMessage] = useState('');
  const updateUser = (data: AccountDetails): Promise<Customer> => {
    if (!customerStore.customer) {
      throw new Error('no customer in store');
    }
    const requestBody = getRequestBody(customerStore.customer, data);
    if (!token) {
      throw new Error('no token in store');
    }
    const response = updateCustomer(...requestBody, token);
    return response;
  };
  const accountMutation = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      console.log(error);
      setErrorMessage(error.message);
    },
    onSuccess: (response) => {
      customerStore.setCustomer({ customer: response });
      onSubmit();
    },
  });
  return [accountMutation, errorMessage] as const;
}

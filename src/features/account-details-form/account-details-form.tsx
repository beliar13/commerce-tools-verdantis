import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Collapse } from '@mui/material';
import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { Customer } from '@/lib/axios/requests/schemas/customer.schema.ts';
import { Action } from '@/lib/axios/requests/update-customer/update-actions.types.ts';
import { updateCustomer } from '@/lib/axios/requests/update-customer/update-request.ts';
import { useCustomerStore } from '@/stores/customer-store.ts';
import { useTokenStore } from '@/stores/token-store.ts';

import { AccountDetails, accountSchema } from './account-details.schema.ts';
import { ProfileInfoContent } from './profile-information.tsx';

const getRequestBody = (
  prevCustomerInfo: Customer,
  formData: AccountDetails,
): [number, Action[]] => {
  const actions: Action[] = [];
  const version = prevCustomerInfo.version;
  if (formData.dateOfBirth !== prevCustomerInfo.dateOfBirth) {
    actions.push({ action: 'setDateOfBirth', dateOfBirth: formData.dateOfBirth });
  }
  if (formData.firstName !== prevCustomerInfo.firstName) {
    actions.push({ action: 'setFirstName', firstName: formData.firstName });
  }
  if (formData.lastName !== prevCustomerInfo.lastName) {
    actions.push({ action: 'setLastName', lastName: formData.lastName });
  }
  if (actions.length === 0) {
    throw new Error('no data to update');
  }
  return [version, actions];
};

function useAccountFormMutation(): [UseMutationResult<Customer, Error, AccountDetails>, string] {
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
    },
  });
  return [accountMutation, errorMessage] as const;
}

export const AccountDetailsForm: FC<Customer> = (customer) => {
  const { dateOfBirth, firstName, lastName } = customer;
  const { control, handleSubmit, watch } = useForm<AccountDetails>({
    defaultValues: { dateOfBirth, firstName, isEditMode: false, lastName },
    mode: 'onChange',
    resolver: zodResolver(accountSchema),
  });
  const [accountMutation, errorMessage] = useAccountFormMutation();
  return (
    <form
      className="mx-auto flex max-w-96 flex-col gap-2"
      onSubmit={(e) =>
        void handleSubmit((data): void => {
          accountMutation.mutate(data);
        })(e)
      }
    >
      <ProfileInfoContent {...{ control, customer, isEditMode: watch('isEditMode') }} />
      <Collapse in={watch('isEditMode')}>
        <Button
          className="mx-auto my-0 block"
          disabled={accountMutation.isPending}
          type="submit"
          variant="contained"
        >
          Save changes
        </Button>
      </Collapse>
      <Collapse in={!!errorMessage}>
        <Alert severity="warning">{errorMessage}</Alert>
      </Collapse>
    </form>
  );
};

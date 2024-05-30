import { FC, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Collapse } from '@mui/material';

import { Customer } from '@/lib/axios/requests/schemas/customer.schema.ts';

import { AccountDetails, accountSchema } from './account-details.schema.ts';
import { ProfileInfoContent } from './profile-information.tsx';
import { useAccountFormMutation } from './use-account-form-mutation.tsx';

const useSideEffect = ({
  condition,
  onFalse,
  onTrue,
}: {
  condition: boolean;
  onFalse: () => void;
  onTrue: () => void;
}): void => {
  useEffect(() => {
    if (condition) {
      onTrue();
    } else {
      onFalse();
    }
  }, [condition, onFalse, onTrue]);
};

export const AccountDetailsForm: FC<Customer> = (customer) => {
  const { dateOfBirth, firstName, lastName } = customer;
  const { control, getValues, handleSubmit, setValue, watch } = useForm<AccountDetails>({
    defaultValues: { dateOfBirth, firstName, isEditMode: false, lastName },
    mode: 'onChange',
    resolver: zodResolver(accountSchema),
  });
  const [accountMutation, errorMessage] = useAccountFormMutation();
  const prevFormData = useRef<AccountDetails | null>(null);
  useSideEffect({
    condition: getValues('isEditMode') && !errorMessage,
    onFalse: () => {
      if (!prevFormData.current) {
        return;
      }
      const { dateOfBirth, firstName, lastName } = prevFormData.current;
      setValue('dateOfBirth', dateOfBirth);
      setValue('firstName', firstName);
      setValue('lastName', lastName);
    },
    onTrue: () => {
      prevFormData.current = { ...getValues() };
    },
  });
  return (
    <form
      className="mx-auto flex max-w-96 flex-col gap-2"
      onSubmit={(e) =>
        void handleSubmit((data): void => {
          setValue('isEditMode', false);
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
      <Collapse in={!!errorMessage && watch('isEditMode')}>
        <Alert severity="warning">{errorMessage}</Alert>
      </Collapse>
    </form>
  );
};

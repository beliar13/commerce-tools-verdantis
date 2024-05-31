import { FC, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Collapse } from '@mui/material';

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

const CollapseElement: FC<{ isCollapsed: boolean; isDisabled: boolean }> = ({
  isCollapsed,
  isDisabled,
}) => {
  return (
    <Collapse in={isCollapsed}>
      <Button
        className="mx-auto my-0 block"
        disabled={isDisabled}
        type="submit"
        variant="contained"
      >
        Save changes
      </Button>
    </Collapse>
  );
};

export const AccountDetailsForm: FC<Customer> = (customer) => {
  const { dateOfBirth, email, firstName, lastName } = customer;
  const { control, getValues, handleSubmit, setValue, trigger, watch } = useForm<AccountDetails>({
    defaultValues: { dateOfBirth, email, firstName, isEditMode: false, lastName },
    mode: 'onChange',
    resolver: zodResolver(accountSchema),
  });
  const [accountMutation] = useAccountFormMutation();
  const prevFormData = useRef<AccountDetails | null>(null);
  useSideEffect({
    condition: getValues('isEditMode'),
    onFalse: () => {
      if (!prevFormData.current) {
        return;
      }
      const { dateOfBirth, email, firstName, lastName } = prevFormData.current;
      setValue('dateOfBirth', dateOfBirth);
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('email', email);
      void trigger();
    },
    onTrue: () => {
      prevFormData.current = { ...getValues() };
    },
  });
  return (
    <form
      className="mx-auto flex flex-col gap-2"
      onSubmit={(e) =>
        void handleSubmit((data): void => {
          setValue('isEditMode', false);
          prevFormData.current = null;
          accountMutation.mutate(data);
        })(e)
      }
    >
      <ProfileInfoContent {...{ control, customer, isEditMode: watch('isEditMode') }} />
      <CollapseElement
        {...{
          isCollapsed: watch('isEditMode'),
          isDisabled: accountMutation.isPending,
        }}
      />
    </form>
  );
};

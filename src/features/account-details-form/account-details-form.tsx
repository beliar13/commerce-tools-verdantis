import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Collapse, Snackbar } from '@mui/material';

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

const SnackBarAlert: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <Snackbar
      autoHideDuration={5000}
      message="Data was successfully updated"
      onClose={onClose}
      open={isOpen}
    />
  );
};

const CollapseElements: FC<{ errorMessage: string; isCollapsed: boolean; isDisabled: boolean }> = ({
  errorMessage,
  isCollapsed,
  isDisabled,
}) => {
  return (
    <>
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
      <Collapse in={!!errorMessage}>
        <Alert severity="warning">{errorMessage}</Alert>
      </Collapse>
    </>
  );
};

export const AccountDetailsForm: FC<Customer> = (customer) => {
  const { dateOfBirth, email, firstName, lastName } = customer;
  const { control, getValues, handleSubmit, setValue, watch } = useForm<AccountDetails>({
    defaultValues: { dateOfBirth, email, firstName, isEditMode: false, lastName },
    mode: 'onChange',
    resolver: zodResolver(accountSchema),
  });
  const [accountMutation, errorMessage] = useAccountFormMutation(() => {
    setIsOpen(true);
  });
  const [isOpen, setIsOpen] = useState(false);
  const prevFormData = useRef<AccountDetails | null>(null);
  useSideEffect({
    condition: getValues('isEditMode') && !errorMessage,
    onFalse: () => {
      if (!prevFormData.current) {
        return;
      }
      const { dateOfBirth, email, firstName, lastName } = prevFormData.current;
      setValue('dateOfBirth', dateOfBirth);
      setValue('firstName', firstName);
      setValue('lastName', lastName);
      setValue('email', email);
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
      <CollapseElements
        {...{
          errorMessage,
          isCollapsed: watch('isEditMode'),
          isDisabled: accountMutation.isPending,
        }}
      />
      <SnackBarAlert
        {...{
          isOpen,
          onClose: () => {
            setIsOpen(false);
          },
        }}
      />
    </form>
  );
};

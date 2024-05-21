import { useState } from 'react';

import { UseMutationResult, useMutation } from '@tanstack/react-query';

import { SignUpResult } from '@/lib/axios/requests/schemas/sign-up-result-schema';
import { TokenInfo } from '@/lib/axios/requests/schemas/token-info.schema';
import { MyCustomerDraft } from '@/lib/axios/requests/sign-up-customer';

import { useRegisterUser } from './register-user';

export function useRegistrationFormMutation(): [
  UseMutationResult<[TokenInfo, SignUpResult], Error, MyCustomerDraft>,
  string,
] {
  const [errorMessage, setErrorMessage] = useState('');
  const registrationMutation = useMutation({
    mutationFn: useRegisterUser(),
    onError: (error) => {
      console.log(error);
      setErrorMessage(error.message);
    },
    onSuccess: (response) => {
      console.log('You were successfully registered', response);
      // TODO sign in   signInCustomer({ email, password }, tokenInfo);
    },
  });
  return [registrationMutation, errorMessage] as const;
}

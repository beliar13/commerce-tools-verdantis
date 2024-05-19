import { FC, ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { ControllerComponent } from '../controller-component';
import { RegistrationInfo, registrationSchema } from './validation';

export const RegistrationForm: FC<{
  children?: ReactNode;
}> = () => {
  const { control, handleSubmit } = useForm<RegistrationInfo>({
    defaultValues: {
      email: 'testemail@email.com',
      password: '12345aA!',
    },
    resolver: zodResolver(registrationSchema),
  });
  const onSubmit: SubmitHandler<RegistrationInfo> = (data) => console.log(data);
  const loginMutation = useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return (
    <form
      className="ml-auto mr-auto mt-0 flex max-w-80  flex-col gap-2 "
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <ControllerComponent {...{ control, label: 'Email', name: 'email', type: 'email' }} />
      <ControllerComponent
        {...{ control, label: 'Password', name: 'password', type: 'password' }}
      />
      <ControllerComponent {...{ control, label: 'First Name', name: 'firstName', type: 'text' }} />
      <ControllerComponent {...{ control, label: 'Last Name', name: 'lastName', type: 'text' }} />
      <ControllerComponent {...{ control, label: 'Birthday', name: 'dateOfBirth', type: 'date' }} />
      <Button disabled={loginMutation.isPending} type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};

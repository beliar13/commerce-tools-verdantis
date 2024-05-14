import { ReactNode } from 'react';
import { Control, Controller, SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

export default function RegistrationForm(): ReactNode {
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
      <label htmlFor="email">Email</label>
      <ControllerComponent {...{ control, name: 'email', type: 'email' }} />
      <label htmlFor="password">Password</label>
      <ControllerComponent {...{ control, name: 'password', type: 'password' }} />
      <label htmlFor="firstName">First Name</label>
      <ControllerComponent {...{ control, name: 'firstName', type: 'text' }} />
      <label htmlFor="lastName">Last Name</label>
      <ControllerComponent {...{ control, name: 'lastName', type: 'text' }} />
      <label htmlFor="dateOfBirth">When were you born</label>
      <ControllerComponent {...{ control, name: 'dateOfBirth', type: 'date' }} />
      <Button disabled={loginMutation.isPending} type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
}

const registrationSchema = z.object({
  checkbox: z.boolean(),
  dateOfBirth: z
    .string()
    .date()
    .refine((value) => {
      const currentDate = new Date();
      const userDateOfBirth = new Date(value);
      const userAge = currentDate.getFullYear() - userDateOfBirth.getFullYear();
      return userAge >= 13;
    }, 'User must be at least 13 years old'),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().refine((password) => password.length >= 8, {
    message: 'Your password cannot be less than 8 characters',
  }),
});

type RegistrationInfo = z.infer<typeof registrationSchema>;

export const ControllerComponent = ({
  control,
  name,
  type,
}: {
  control: Control<RegistrationInfo>;
  name: keyof RegistrationInfo;
  type: string;
}): ReactNode => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        console.log('controller', field);
        return (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message ?? ' '}
            size="small"
            type={type}
            {...field}
          />
        );
      }}
    />
  );
};

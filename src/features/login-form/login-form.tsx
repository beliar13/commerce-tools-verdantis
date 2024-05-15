import { useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Collapse, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { getToken } from '@/lib/axios/requests/get-token';
import { signInCustomer } from '@/lib/axios/requests/sign-in-customer';

import { LoginInfo, loginSchema } from './login-form.schema';

const ControllerComponent = ({
  control,
  name,
}: {
  control: Control<LoginInfo>;
  name: keyof LoginInfo;
}): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <TextField
            error={fieldState.invalid}
            helperText={fieldState.error?.message ?? ' '}
            size="small"
            {...field}
          />
        );
      }}
    />
  );
};

async function loginUser({
  password,
  username,
}: {
  password: string;
  username: string;
}): Promise<void> {
  const tokenInfo = await getToken({ password, username });
  const result = await signInCustomer({ email: username, password }, tokenInfo.access_token);
  console.log(result);
}

export const LoginForm = (): JSX.Element => {
  const { control, handleSubmit } = useForm<LoginInfo>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const [errorMessage, setErrorMessage] = useState('');
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      console.log(error);
      setErrorMessage(error.message);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return (
    <form
      className="flex max-w-80 flex-col gap-2"
      onSubmit={(e) =>
        void handleSubmit(({ email: username, password }): void => {
          loginMutation.mutate({ password, username });
        })(e)
      }
    >
      <ControllerComponent {...{ control, name: 'email' }} />
      <ControllerComponent {...{ control, name: 'password' }} />
      {
        <Collapse in={!!errorMessage}>
          <Alert severity="warning">{errorMessage}</Alert>
        </Collapse>
      }
      <Button disabled={loginMutation.isPending} type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};

import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Button, Collapse } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { ControlledTextField } from '../../components/controlled-text-field';
import { loginUser } from '../../lib/axios/requests/login-user';
import { LoginInfo, loginSchema } from './login-form.schema.ts';
import { PasswordInput } from './password-input.tsx';

export const LoginForm: FC = () => {
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
      className="mx-auto flex max-w-96 flex-col gap-2"
      onSubmit={(e) =>
        void handleSubmit(({ email: username, password }): void => {
          loginMutation.mutate({ password, username });
        })(e)
      }
    >
      <ControlledTextField control={control} label="Email" name="email" />
      <PasswordInput {...control} />
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

import { useState } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Alert, Button, Collapse, IconButton, InputAdornment, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { getToken } from '@/lib/axios/requests/get-token';
import { signInCustomer } from '@/lib/axios/requests/sign-in-customer';

import { LoginInfo, loginSchema } from './login-form.schema';

const ControllerComponent = ({
  control,
  label,
  name,
}: {
  control: Control<LoginInfo>;
  label: string;
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
            label={label}
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

const PasswordInput = (control: Control<LoginInfo>): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  return (
    <Controller
      control={control}
      name="password"
      render={({ field, fieldState }) => {
        return (
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={handleClickShowPassword}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseUp={(event) => event.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field}
            error={fieldState.invalid}
            helperText={fieldState.error?.message ?? ' '}
            label="Password"
            size="small"
            type={showPassword ? 'text' : 'password'}
          />
        );
      }}
    />
  );
};

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
      className="flex max-w-96 flex-col gap-2"
      onSubmit={(e) =>
        void handleSubmit(({ email: username, password }): void => {
          loginMutation.mutate({ password, username });
        })(e)
      }
    >
      <ControllerComponent {...{ control, label: 'Email', name: 'email' }} />
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

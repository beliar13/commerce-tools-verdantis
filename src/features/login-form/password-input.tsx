import { FC, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import { LoginInfo } from './login-form.schema';

export const PasswordInput: FC<Control<LoginInfo>> = (control) => {
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

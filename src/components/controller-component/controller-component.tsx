import { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';

import { TextField } from '@mui/material';

import { RegistrationInfo } from '../registration-form/validation';

export const ControllerComponent = ({
  control,
  label,
  name,
  placeholder = '',
  type,
}: {
  control: Control<RegistrationInfo>;
  label: string;
  name: keyof RegistrationInfo;
  placeholder?: string;
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
            label={label}
            placeholder={placeholder}
            size="small"
            type={type}
            {...field}
          />
        );
      }}
    />
  );
};

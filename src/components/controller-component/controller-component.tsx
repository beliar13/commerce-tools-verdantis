import { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';

import { TextField } from '@mui/material';

import { RegistrationInfo } from '../registration/registration-form/validation';

type ControllerProps = {
  control: Control<RegistrationInfo>;
  defaultChecked?: boolean;
  label: string;
  name: keyof RegistrationInfo;
  placeholder?: string;

  type: string;
};

export const ControllerComponent = ({
  control,
  defaultChecked = false,
  label,
  name,
  placeholder = '',
  type,
}: ControllerProps): ReactNode => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <TextField
            defaultChecked={defaultChecked}
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

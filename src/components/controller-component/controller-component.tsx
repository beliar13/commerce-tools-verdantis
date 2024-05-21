import { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';

import { TextField } from '@mui/material';

import { RegistrationFormFields } from '../registration/registration-form/registration-form-schema';

type ControllerProps = {
  control: Control<RegistrationFormFields>;
  defaultChecked?: boolean;
  label: string;
  name: keyof RegistrationFormFields;
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

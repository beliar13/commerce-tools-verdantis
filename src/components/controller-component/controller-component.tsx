import { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';

import { TextField } from '@mui/material';

import { RegistrationFormFields } from '../../lib/axios/requests/schemas/registration-form-schema';

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

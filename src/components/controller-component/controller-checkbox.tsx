import { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';

import { Checkbox, FormControlLabel } from '@mui/material';

import { RegistrationFormFields } from '../../lib/axios/requests/schemas/registration-form-schema';

type ControlledCheckboxProps = {
  control: Control<RegistrationFormFields>;
  label: string;
  name: keyof RegistrationFormFields;
};

export const ControlledCheckbox = ({
  control,
  label,
  name,
}: ControlledCheckboxProps): ReactNode => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => <FormControlLabel {...field} control={<Checkbox />} label={label} />}
    />
  );
};

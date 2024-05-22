import { FC } from 'react';
import type { Control } from 'react-hook-form';

import { Stack } from '@mui/material';

import { RegistrationFormFields } from '../../../lib/axios/requests/schemas/registration-form-schema';
import { BillingAddress } from './billing';
import { ShippingAddress } from './shipping';

export type DefaultAddress = 'billing' | 'none' | 'shipping';

export const AddressControlPanel: FC<{
  control: Control<RegistrationFormFields>;
}> = ({ control }) => {
  return (
    <Stack sx={{ flexDirection: 'row' }} width={'100%'}>
      <ShippingAddress control={control} />
      <BillingAddress control={control} />
    </Stack>
  );
};

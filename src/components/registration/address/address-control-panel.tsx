import { FC, useState } from 'react';
import type { Control } from 'react-hook-form';

import { Stack } from '@mui/material';

import { RegistrationFormFields } from '../../../lib/axios/requests/schemas/registration-form-schema';
import { BillingAddress } from './billing';
import { ShippingAddress } from './shipping';

export type DefaultAddress = 'billing' | 'none' | 'shipping';

export const AddressControlPanel: FC<{
  control: Control<RegistrationFormFields>;
}> = ({ control }) => {
  const [defaultAddress, setDefaultAddress] = useState<DefaultAddress>('none');
  return (
    <Stack sx={{ flexDirection: 'row' }} width={'100%'}>
      <ShippingAddress
        control={control}
        defaultAddress={defaultAddress}
        setDefaultAddress={setDefaultAddress}
      />
      <BillingAddress
        control={control}
        defaultAddress={defaultAddress}
        setDefaultAddress={setDefaultAddress}
      />
    </Stack>
  );
};

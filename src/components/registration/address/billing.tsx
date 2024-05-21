import { type FC, ReactNode, useState } from 'react';
import type { Control } from 'react-hook-form';

import { Checkbox, FormControlLabel, Typography } from '@mui/material';

import { ControllerComponent } from '@/components/controller-component';

import type { RegistrationFormFields } from '../registration-form/registration-form-schema';

import { DefaultAddress } from './address-control-panel';
import { AddressWrapper } from './address-wrapper';

export const BillingAddress: FC<{
  children?: ReactNode;
  control: Control<RegistrationFormFields>;
  defaultAddress: DefaultAddress;
  setDefaultAddress: (value: DefaultAddress) => void;
}> = ({ control, defaultAddress }) => {
  const [isDefault, setDefault] = useState(defaultAddress === 'billing');
  return (
    <AddressWrapper isDefault={isDefault}>
      <Typography
        component={'h4'}
        sx={{ fontSize: { lg: 20, md: 15, sm: 15 } }}
        textAlign={'center'}
      >
        Billing
      </Typography>
      <FormControlLabel
        control={<Checkbox onChange={() => setDefault(true)} />}
        label={'Set as default'}
      />

      <ControllerComponent {...{ control, label: 'street', name: 'streetBilling', type: 'text' }} />
      <ControllerComponent {...{ control, label: 'city', name: 'cityBilling', type: 'text' }} />
      <ControllerComponent
        {...{ control, label: 'country', name: 'countryBilling', type: 'text' }}
      />
      <ControllerComponent
        {...{ control, label: 'postal-code', name: 'postalCodeBilling', type: 'text' }}
      />
    </AddressWrapper>
  );
};

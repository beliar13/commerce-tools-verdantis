import { FC, ReactNode } from 'react';
import type { Control } from 'react-hook-form';

import { Typography } from '@mui/material';

import { ControllerComponent } from '@/components/controller-component';

import type { RegistrationInfo } from '../registration-form/validation';

import { AddressWrapper } from './address-wrapper';

export const ShippingAddress: FC<{
  children?: ReactNode;
  control: Control<RegistrationInfo>;
}> = ({ control }) => {
  return (
    <AddressWrapper>
      <Typography
        component={'h4'}
        sx={{ fontSize: { lg: 20, md: 15, sm: 15 } }}
        textAlign={'center'}
      >
        Shipping
      </Typography>
      <ControllerComponent
        {...{ control, label: 'street', name: 'streetShipping', type: 'text' }}
      />
      <ControllerComponent {...{ control, label: 'city', name: 'cityShipping', type: 'text' }} />
      <ControllerComponent
        {...{ control, label: 'country', name: 'countryShipping', type: 'text' }}
      />
      <ControllerComponent
        {...{ control, label: 'postal-code', name: 'postalCodeShipping', type: 'text' }}
      />
    </AddressWrapper>
  );
};

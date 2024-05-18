import { FC, ReactNode } from 'react';
import type { Control } from 'react-hook-form';

import { Typography } from '@mui/material';

import { ControllerComponent } from '@/components/controller-component';

import type { RegistrationInfo } from '../registration-form/validation';

import { DefaultAddress } from './address-control-panel';
import { AddressWrapper } from './address-wrapper';

export const BillingAddress: FC<{
  children?: ReactNode;
  control: Control<RegistrationInfo>;
  defaultAddress: DefaultAddress;
  setDefaultAddress: (value: DefaultAddress) => void;
}> = ({ control, defaultAddress }) => {
  console.log(defaultAddress);
  // const [isDefault, setDefault] = useState(defaultAddress === 'billing');
  // setDefault(false);
  return (
    <AddressWrapper isDefault={false}>
      <Typography
        component={'h4'}
        sx={{ fontSize: { lg: 20, md: 15, sm: 15 } }}
        textAlign={'center'}
      >
        Billing
      </Typography>

      <ControllerComponent
        {...{
          control,
          defaultChecked: false,
          label: 'Set as default',
          name: 'setBillingAsDefault',
          type: 'checkbox',
        }}
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

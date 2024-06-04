import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Card, List, ListItem, ListItemText } from '@mui/material';

import { ControlledSwitch } from '@/components/controlled-switch/controlled-switch';
import { ControlledTextField } from '@/components/controlled-text-field';

import { RegistrationAddress } from '../registration-form/registration-form-types';
import { EditAddress, editAddressSchema } from './edit-address.shema';

export const EditAddressForm: FC<{
  address: RegistrationAddress;
  isBilling: boolean;
  isDefaultBilling: boolean;
  isDefaultShipping: boolean;
  isShipping: boolean;
}> = ({ address, isBilling, isDefaultBilling, isDefaultShipping, isShipping }) => {
  const { city, country, postalCode, streetName } = address;
  const { control, formState } = useForm<EditAddress>({
    defaultValues: {
      city,
      country,
      isBilling,
      isDefaultBilling,
      isDefaultShipping,
      isShipping,
      postalCode,
      streetName,
    },
    mode: 'onChange',
    resolver: zodResolver(editAddressSchema),
  });
  console.log(formState);
  return (
    <Card className="bg-white">
      <form>
        <List>
          <ListItem className="items-start">
            <ListItemText className="whitespace-nowrap p-1" primary="Country:" />
            <ControlledTextField {...{ control, name: 'country' }} />
          </ListItem>
          <ListItem className="items-start">
            <ListItemText className="whitespace-nowrap p-1" primary="City:" />
            <ControlledTextField {...{ control, name: 'city' }} />
          </ListItem>
          <ListItem className="items-start">
            <ListItemText className="whitespace-nowrap p-1" primary="Street:" />
            <ControlledTextField {...{ control, name: 'streetName' }} />
          </ListItem>
          <ListItem className="items-start">
            <ListItemText className="p-1" primary="Postal code:" />
            <ControlledTextField {...{ control, name: 'postalCode' }} />
          </ListItem>
        </List>
        <ControlledSwitch {...{ control, label: 'Set as billing', name: 'isBilling' }} />
        <ControlledSwitch {...{ control, label: 'Set as shipping', name: 'isShipping' }} />
        <ControlledSwitch {...{ control, label: 'Set as default shipping', name: 'isDefaultBilling' }} />
        <ControlledSwitch {...{ control, label: 'Set as default Billing', name: 'isDefaultShipping' }} />
      </form>
    </Card>
  );
};

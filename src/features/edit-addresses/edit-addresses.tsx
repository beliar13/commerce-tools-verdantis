import { FC } from 'react';

import { Box } from '@mui/material';

import { Customer } from '@/lib/axios/requests/schemas/customer.schema';

import { EditAddressForm } from './edit-address-form';

export const EditAddresses: FC<{ customer: Customer }> = ({ customer }) => {
  const addresses = customer.addresses;
  console.log(addresses);
  return (
    <Box>
      {addresses.map((address) => {
        const id = address.id;
        if (!id) {
          throw new Error('No id for address');
        }
        return (
          <EditAddressForm
            address={address}
            isBilling={Boolean(customer.billingAddressIds?.includes(id))}
            isDefaultBilling={Boolean(address.id === customer.defaultBillingAddressId)}
            isDefaultShipping={Boolean(address.id === customer.defaultShippingAddressId)}
            isShipping={Boolean(customer.shippingAddressIds?.includes(id))}
            key={address.id}
          />
        );
      })}
    </Box>
  );
};

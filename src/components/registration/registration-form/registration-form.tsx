import { FC, ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Stack, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { AddressControlPanel } from '../address/address-control-panel';
import { GeneralInputs } from '../general-inputs';
import { RegistrationInfo, registrationSchema } from './validation';

const defaultValues = {
  cityBilling: 'NY',
  cityShipping: 'NY',
  countryBilling: 'USA',
  countryShipping: 'USA',
  dateOfBirth: '01-01-2000',
  email: 'testemail@email.com',
  firstName: 'Mike',
  lastName: 'Tyson',
  password: '12345aA!',
  postalCodeBilling: 'h2t-1b8',
  postalCodeShipping: 'h2t-1b8',
  streetBilling: 'Ray',
  streetShipping: 'Ray',
};

export const RegistrationForm: FC<{
  children?: ReactNode;
}> = () => {
  const { control, handleSubmit } = useForm<RegistrationInfo>({
    defaultValues,
    resolver: zodResolver(registrationSchema),
  });
  const onSubmit: SubmitHandler<RegistrationInfo> = (data) => console.log(data);

  const registrationMutation = useMutation({
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return (
    <form
      className="ml-auto mr-auto mt-0 flex max-w-80  flex-col gap-2 "
      onChange={(e) => void e}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
      <GeneralInputs control={control} />
      <Stack sx={{ flexDirection: 'column' }} width={'100%'}>
        <Typography
          component={'h3'}
          sx={{ fontSize: { lg: 40, md: 32, sm: 24 } }}
          textAlign={'center'}
        >
          Addresses
        </Typography>
        <Stack sx={{ flexDirection: 'row' }} width={'100%'}>
          <AddressControlPanel control={control} />
        </Stack>
      </Stack>

      <Button disabled={registrationMutation.isPending} type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
};

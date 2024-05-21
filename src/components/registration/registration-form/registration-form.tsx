import { FC } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  Collapse,
  Stack,
  //  Typography
} from '@mui/material';

import { AddressControlPanel } from '../address/address-control-panel';
import { GeneralInputs } from '../general-inputs';
import { getRegistrationData } from './get-registration-data';
import { registrationFormDefaultValues } from './registration-form-constants';
import { RegistrationFormFields, registrationSchema } from './registration-form-schema';
import { useRegistrationFormMutation } from './use-registration-form-mutation';

export const RegistrationForm: FC = () => {
  const { control, handleSubmit } = useForm<RegistrationFormFields>({
    defaultValues: registrationFormDefaultValues,
    mode: 'onChange',
    resolver: zodResolver(registrationSchema),
  });
  const submitHandler = (data: RegistrationFormFields): void => {
    const dataForRequest = getRegistrationData(data);
    console.log(dataForRequest);
    registrationMutation.mutate(dataForRequest);
  };
  const [registrationMutation, errorMessage] = useRegistrationFormMutation();
  return (
    <form
      className="ml-auto mr-auto mt-0 flex max-w-80  flex-col gap-2 "
      onSubmit={(e) => void handleSubmit(submitHandler, (error) => console.log(error))(e)}
    >
      <GeneralInputs control={control} />
      <Stack sx={{ flexDirection: 'column' }} width={'100%'}>
        {/* <Typography
          component={'h3'}
          sx={{ fontSize: { lg: 40, md: 32, sm: 24 } }}
          textAlign={'center'}
        >
          Addresses
        </Typography> */}
        <Stack sx={{ flexDirection: 'row' }} width={'100%'}>
          <AddressControlPanel control={control} />
        </Stack>
      </Stack>
      {
        <Collapse in={!!errorMessage}>
          <Alert severity="warning">{errorMessage}</Alert>
        </Collapse>
      }
      <Button disabled={registrationMutation.isPending} type="submit" variant="contained">
        Register
      </Button>
    </form>
  );
};

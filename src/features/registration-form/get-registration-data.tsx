import { MyCustomerDraft } from '@/lib/axios/requests/sign-up-customer';

import { RegistrationFormFields } from '../../lib/axios/requests/schemas/registration-form-schema';

export const getRegistrationData = (data: RegistrationFormFields): MyCustomerDraft => {
  const {
    cityBilling,
    cityShipping,
    countryBilling,
    countryShipping,
    dateOfBirth,
    email,
    firstName,
    lastName,
    password,
    postalCodeBilling,
    postalCodeShipping,
    streetBilling,
    streetShipping,
  } = data;
  const billingAddress = {
    city: cityBilling,
    country: countryBilling,
    postalCode: postalCodeBilling,
    streetName: streetBilling,
  };
  const shippingAddress = {
    city: cityShipping,
    country: countryShipping,
    postalCode: postalCodeShipping,
    streetName: streetShipping,
  };
  return {
    addresses: [billingAddress, shippingAddress],
    dateOfBirth,
    email,
    firstName,
    lastName,
    password,
  };
};

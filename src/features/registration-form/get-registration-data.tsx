import { MyCustomerDraft } from '@/lib/axios/requests/sign-up-customer';

import { RegistrationFormFields } from '../../lib/axios/requests/schemas/registration-form-schema';

export const getRegistrationData = (data: RegistrationFormFields): MyCustomerDraft => {
  const billingAddress = {
    city: data.cityBilling,
    country: data.countryBilling,
    postalCode: data.postalCodeBilling,
    streetName: data.streetBilling,
  };
  const shippingAddress = {
    city: data.cityShipping,
    country: data.countryShipping,
    postalCode: data.postalCodeShipping,
    streetName: data.streetShipping,
  };
  const defaultShippingAddressIndex = 1;
  const defaultBillingAddressIndex = 0;

  const registrationData: MyCustomerDraft = {
    addresses: [billingAddress, shippingAddress],
    dateOfBirth: data.dateOfBirth,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  };
  if (data.setBillingAsDefault) {
    registrationData.defaultBillingAddress = defaultBillingAddressIndex;
  }
  if (data.setShippingAsDefault) {
    registrationData.defaultShippingAddress = defaultShippingAddressIndex;
  }
  return registrationData;
};

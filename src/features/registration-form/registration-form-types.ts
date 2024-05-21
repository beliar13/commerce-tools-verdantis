export type RegistrationAddress = {
  city: string;
  country: string;
  postalCode: string;
  region?: string;
  streetName: string;
};

export type RegistrationRequest = {
  addresses: Array<RegistrationAddress>;
  billingAddresses: Array<number>;
  dateOfBirth: string;
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  salutation?: string;
  shippingAddress?: Array<number>;
  title?: string;
};

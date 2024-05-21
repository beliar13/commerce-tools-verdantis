import { SignUpResult } from '@/lib/axios/requests/schemas/sign-up-result-schema';
import { MyCustomerDraft, signUpCustomer } from '@/lib/axios/requests/sign-up-customer';
import { useTokenStore } from '@/stores/token-store';

type RegisterUserHook = (data: MyCustomerDraft) => Promise<[SignUpResult]>;

export function useRegisterUser(): RegisterUserHook {
  const store = useTokenStore();

  return async function registerUser({
    email,
    firstName,
    lastName,
    password,
  }: MyCustomerDraft): Promise<[SignUpResult]> {
    const anonToken = store.token;
    console.log('TOKEN:', anonToken);
    if (!anonToken) {
      throw new Error('Token expected');
    }
    const customerInfo = await signUpCustomer({ email, firstName, lastName, password }, anonToken);
    return [customerInfo];
  };
}

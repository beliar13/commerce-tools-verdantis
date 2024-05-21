import { getToken } from './get-token';
import { MyCustomerDraft } from './schemas/my-customer-draft-schema';
import { SignInResult } from './schemas/sign-in-result.schema';
import { TokenInfo } from './schemas/token-info.schema';
import { signInCustomer } from './sign-in-customer';
import { signUpCustomer } from './sign-up-customer';

export async function signUpAndLogin(
  myCustomerDraft: MyCustomerDraft,
  token: string,
): Promise<[TokenInfo, SignInResult]> {
  const signUpResult = await signUpCustomer(myCustomerDraft, token);
  console.log(signUpResult);
  const tokenInfo = await getToken({
    password: myCustomerDraft.password,
    username: myCustomerDraft.email,
  });
  // TODO обновить те адреса, которые не отметили дефолтными
  const signInResult = await signInCustomer(myCustomerDraft, tokenInfo.access_token);
  console.log(signInResult);
  return [tokenInfo, signInResult];
}

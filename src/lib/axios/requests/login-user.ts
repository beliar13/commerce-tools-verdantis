import { getToken } from '@/lib/axios/requests/get-token';
import { signInCustomer } from '@/lib/axios/requests/sign-in-customer';

export async function loginUser({
  password,
  username,
}: {
  password: string;
  username: string;
}): Promise<void> {
  const tokenInfo = await getToken({ password, username });
  const result = await signInCustomer({ email: username, password }, tokenInfo.access_token);
  console.log(result);
}

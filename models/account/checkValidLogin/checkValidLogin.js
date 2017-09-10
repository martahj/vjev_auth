// @flow
import checkPasswordsMatch from '../checkPasswordsMatch';
import findByEmail from '../findByEmail';

const checkValidLogin = async (
  email: string,
  password: string
): Promise<boolean> => {
  const account = await findByEmail(email);
  if (!account) return false;
  return checkPasswordsMatch(password, account.password);
};

export default checkValidLogin;

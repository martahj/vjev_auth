// @flow
import { runCreate } from '../../../helpers/database';
import saltPassword from '../saltPassword/';
import checkIfEmailExists from '../checkIfEmailExists';

import type { UserRecord } from '../types';

export const DUPLICATE_EMAIL_ERROR = 'Emails must be unique';

const createAccount = async (email: string, password: string): Promise<UserRecord> => {
  const duplicateEmail = await checkIfEmailExists(email);
  if (duplicateEmail) throw new Error(DUPLICATE_EMAIL_ERROR);
  const saltedPassword = await saltPassword(password);
  return runCreate('Account', { email, password: saltedPassword, admin: false });
};

export default createAccount;

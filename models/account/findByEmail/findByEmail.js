// @flow
import { runFetch } from '../../../helpers/database';
import type { UserRecord } from '../types';

export const INVALID_EMAIL = 'findByEmail must be passed a string email address';

const findByEmail = async (email: string): Promise<UserRecord | null> => {
  if (typeof email !== 'string') throw new Error(INVALID_EMAIL);
  const user = await runFetch('Account', { email });
  return user || null;
};

export default findByEmail;

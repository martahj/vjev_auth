// @flow
import { runFetch } from '../../../helpers/database';
import type { TokenRecord } from '../types';

export const NO_TOKEN_ERROR = 'findToken must be passed a token';
export const BAD_TOKEN_TYPE_ERROR = 'token provided to findToken must be a string';

const findToken = async (token: string): Promise<TokenRecord> => {
  if (!token) throw new Error(NO_TOKEN_ERROR);
  if (typeof token !== 'string') throw new Error(BAD_TOKEN_TYPE_ERROR);
  const foundToken = await runFetch('Token', { token });
  return foundToken || null;
};

export default findToken;

// @flow
import { runCreate } from '../../../helpers/database';
import type { TokenRecord } from '../types';

export const NO_TOKEN_ERROR = 'addToken requires a token parameter';
export const BAD_TOKEN_TYPE_ERROR = 'addToken requires a string token';

const addToken = async (
  token: string
): Promise<TokenRecord | Error> => {
  if (!token) throw new Error(NO_TOKEN_ERROR);
  if (typeof token !== 'string') throw new Error(BAD_TOKEN_TYPE_ERROR);
  return runCreate('Token', { token });
};

export default addToken;

// @flow
import type { TokenRecord } from '../types';

const findToken = async (token: string): Promise<TokenRecord> => {
  const foundToken = await Token.where({ token }).fetch();
  return foundToken || null;
};

export default findToken;

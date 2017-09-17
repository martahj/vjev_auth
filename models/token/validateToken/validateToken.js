// @flow
import jwt from 'jsonwebtoken';
import { secret } from '../../../config/jwt';

export const NO_TOKEN_ERROR = 'validateToken must be provided a token';
export const WRONG_TYPE_TOKEN_ERROR = 'validateToken must be provided a string token';

type DecodedToken = {
  email: string,
};

const validateToken = (token: string): ?DecodedToken.email => {
  if (token === undefined) throw new Error(NO_TOKEN_ERROR);
  if (typeof token !== 'string') throw new Error(WRONG_TYPE_TOKEN_ERROR);
  try {
    const decoded: DecodedToken = jwt.verify(token, secret);
    return (decoded && decoded.email) ? decoded.email : null;
  } catch (err) {
    return null;
  }
};

export default validateToken;

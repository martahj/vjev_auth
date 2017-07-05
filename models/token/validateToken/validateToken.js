// @flow
import jwt from 'jsonwebtoken';
import { secret } from '../../../config/jwt';

type DecodedToken = {
  email: string,
};

const validateToken = (token: string): Error | DecodedToken.email => {
  const decoded: DecodedToken = jwt.verify(token, secret);
  return decoded.email;
};

export default validateToken;

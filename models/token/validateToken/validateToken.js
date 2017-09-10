// @flow
import jwt from 'jsonwebtoken';
import { secret } from '../../../config/jwt';

type DecodedToken = {
  email: string,
};

const validateToken = (token: string): ?DecodedToken.email => {
  try {
    const decoded: DecodedToken = jwt.verify(token, secret);
    return (decoded && decoded.email) ? decoded.email : null;
  } catch (err) {
    return null;
  }
};

export default validateToken;

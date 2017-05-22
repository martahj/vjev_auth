// @flow
import jwt from 'jsonwebtoken';
import { secret } from '../../../config/jwt';

type DecodedToken = {
  email: string,
};

const validateToken = (token: string) => {
  try {
    const decoded: DecodedToken = jwt.verify(token, secret);
    console.log('got decoded', decoded);
    return decoded.email;
  } catch (err) {
    console.log('error validating token', err);
    throw (err);
  }
};

export default validateToken;

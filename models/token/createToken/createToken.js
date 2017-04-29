// @flow
import jwt from 'jsonwebtoken';
import { secret } from '../../../config/jwt';
import getCurrentTimeInSeconds from '../../../utils/getCurrentTimeInSeconds';

const createToken = (
  email: string,
  secondsUntilExpiration: number,
) => new Promise((resolve, reject) => {
  jwt.sign({
    email,
    exp: getCurrentTimeInSeconds() + secondsUntilExpiration,
  }, secret, (err, token) => {
    console.log('got token', token);
    err && reject(err);
    resolve(token);
  });
});

export default createToken;

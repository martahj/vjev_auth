// @flow
import jwt from 'jsonwebtoken';
import { secret } from '../config/jwt';

const createToken = (
  email: string,
  secondsUntilExpiration: number,
): Function => new Promise(resolve, reject) => {
  jwt.sign({
    email,
    exp: getCurrentTime() + secondsUntilExpiration,
  }, secret, (err, token) => {
    err && reject(err);
    resolve(token);
  });
}

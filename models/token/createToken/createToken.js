// @flow
import jwt from 'jsonwebtoken';
import { secret } from '../../../config/jwt';
import getCurrentTimeInSeconds from '../../../utils/getCurrentTimeInSeconds';

const createToken = (
  email: string,
  secondsUntilExpiration: number = (60 * 60), // default to hour-long sessions
) => new Promise((resolve, reject) => {
  jwt.sign({
    email,
    exp: getCurrentTimeInSeconds() + secondsUntilExpiration,
  }, secret, (err, token) => {
    err && reject(err);
    resolve(token);
  });
});

export default createToken;

// @flow
import jwt from 'jsonwebtoken';
import { secret } from '../../../config/jwt';
import getCurrentTimeInSeconds from '../../../utils/getCurrentTimeInSeconds';

export const NO_EMAIL_ERROR = 'createToken must be passed an email';
export const BAD_EMAIL_TYPE_ERROR = 'email address provided to createToken must a string';

const createToken = (
  email: string,
  secondsUntilExpiration: number = (60 * 60), // default to hour-long sessions
): Promise<string | Error> => new Promise((resolve, reject) => {
  if (!email) reject(new Error(NO_EMAIL_ERROR));
  if (typeof email !== 'string') reject(new Error(BAD_EMAIL_TYPE_ERROR));

  jwt.sign({
    email,
    exp: getCurrentTimeInSeconds() + secondsUntilExpiration,
  }, secret, (err, token) => {
    err && reject(err);
    resolve(token);
  });
});

export default createToken;

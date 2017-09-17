// @flow
import bcrypt from 'bcrypt';

export const INVALID_PASSWORD_ERROR = 'saltPassword must be provided a string password';

const SALT_ROUNDS = 10;

const saltPassword = (password: string): Promise<string|Error> => {
  if (!password || typeof password !== 'string') throw new Error(INVALID_PASSWORD_ERROR);
  return bcrypt.hash(password, SALT_ROUNDS);
};

export default saltPassword;

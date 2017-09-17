// @flow
import bcrypt from 'bcrypt';

export const BAD_PASSWORD = 'checkPasswordsMatch requires a string plaintext password';
export const BAD_HASHED = 'checkPasswordsMatch requires a string hashed password';

const checkPasswordsMatch = (plaintext: string, hashed: string): Promise<boolean> => {
  if (!plaintext || typeof plaintext !== 'string') throw new Error(BAD_PASSWORD);
  if (!hashed || typeof hashed !== 'string') throw new Error(BAD_HASHED);
  return bcrypt.compare(plaintext, hashed);
};

export default checkPasswordsMatch;

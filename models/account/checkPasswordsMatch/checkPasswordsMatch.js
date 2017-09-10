// @flow
import bcrypt from 'bcrypt';

const checkPasswordsMatch = (
  plaintext: string,
  hashed: string,
): Promise<boolean> => bcrypt.compare(plaintext, hashed);

export default checkPasswordsMatch;

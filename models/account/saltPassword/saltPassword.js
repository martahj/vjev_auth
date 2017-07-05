// @flow
import bcrypt from 'bcrypt';

const saltRounds = 10;

const saltPassword = (password: string): string => bcrypt.hash(
  password,
  saltRounds,
);

export default saltPassword;

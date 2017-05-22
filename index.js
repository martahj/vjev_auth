// @flow
// import seneca from 'seneca';
import checkEmailIsUnique from './models/account/checkEmailIsUnique';
import saltPassword from './models/account/saltPassword';
import createToken from './models/account/createToken';
import checkValidLogin from './models/account/checkValidLogin';

/*
 * Create user account
 * Output: token
 */
const createUserAccount = (email: string, rawPw: string): void => {
  const emailIsUnique: boolean = checkEmailIsUnique(email);
  if (!emailIsUnique) {
    // send error
  }
  const saltedPw = saltPassword(rawPw);
  // Store email and salted pw in database
  const token = createToken(email);
  // Send token
};

/*
 * Authenticate user by email and password
 * Input: email, password
 * Output: token
 */
const userChecksOut = (email: string, pw: string) => {
  const credentialsMatch = checkValidLogin(email, pw);
  if (!credentialsMatch) {
    // send error
  }
  const token = createToken(email);
  // Send token
};

/*
 * Sign user out
 * Input: tokens
 * Output: true
 */
const signUserOut = (token): void => {
  // decode token
  // delete it from the database
};

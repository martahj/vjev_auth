import test from 'ava';
import validateToken, { NO_TOKEN_ERROR, WRONG_TYPE_TOKEN_ERROR } from './validateToken';
import createToken from '../createToken';
import promisifiedDelay from '../../../utils/promisifiedDelay';

const expiredTokenMilliseconds = 200; // 1/5 of one second
const expiredTokenEmail = 'email@test.co';
const validTokenEmail = 'nowtry@this.com';

let tokenAboutToExpire;
let tokenNotExpired;

test.before(async () => {
  tokenAboutToExpire = await createToken(expiredTokenEmail, 1 / 5);
  tokenNotExpired = await createToken(validTokenEmail, 60);
  await promisifiedDelay(expiredTokenMilliseconds * 5);
});

test('returns null if the token is invalid', (t) => {
  const decodedEmail = validateToken(tokenAboutToExpire);
  t.is(decodedEmail, null);
});

test('Returns the email if decoding a valid token', (t) => {
  const decodedEmail = validateToken(tokenNotExpired);
  t.truthy(decodedEmail);
  t.is(decodedEmail, validTokenEmail);
});

test('throws an error if no token is provided', (t) => {
  try {
    validateToken();
    t.fail();
  } catch (err) {
    t.is(err.message, NO_TOKEN_ERROR);
  }
});

test('throws an error a value that is not a string is passed', (t) => {
  try {
    validateToken([]);
    t.fail();
  } catch (err) {
    t.is(err.message, WRONG_TYPE_TOKEN_ERROR);
  }
});

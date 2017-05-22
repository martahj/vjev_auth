import test from 'ava';
import validateToken from './validateToken';
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
  await promisifiedDelay(expiredTokenMilliseconds);
});

test('Returns the email if decoding a valid token', (t) => {
  const decodedEmail = validateToken(tokenNotExpired);
  t.truthy(decodedEmail);
  t.is(decodedEmail, validTokenEmail);
});

test('throws an error if the token is invalid', (t) => {
  try {
    const decoded = validateToken(tokenAboutToExpire);
    console.log('got decoded', decoded);
    t.fail();
  } catch (err) {
    t.is(err.message, true);
  }
});

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
  await promisifiedDelay(expiredTokenMilliseconds * 5);
});

test('returns null if the token is invalid', async (t) => {
  const decodedEmail = validateToken(tokenAboutToExpire);
  t.is(decodedEmail, null);
});

test('Returns the email if decoding a valid token', (t) => {
  const decodedEmail = validateToken(tokenNotExpired);
  t.truthy(decodedEmail);
  t.is(decodedEmail, validTokenEmail);
});

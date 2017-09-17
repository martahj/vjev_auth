import test from 'ava';
import promisifiedDelay from '../../../utils/promisifiedDelay';
import createAccount, { DUPLICATE_EMAIL_ERROR } from './createAccount';
import { INVALID_PASSWORD_ERROR } from '../saltPassword';
import { INVALID_EMAIL } from '../findByEmail';
import { runDestroy, runFetch } from '../../../helpers/database';

const email = 'ok@this.org';
const password = 'blurh';

test.after.always(async () => {
  await runDestroy('Account', { email });
});

test('Returns and creates a user without admin priveledges and with a salted pw', async (t) => {
  const createdUser = await createAccount(email, password);
  t.truthy(createdUser);
  const createdRecord = await runFetch('Account', { email });
  t.truthy(createdRecord);
  t.is(createdUser.email, email);
  t.is(createdRecord.email, email);
  t.is(createdUser.admin, false);
  t.is(createdRecord.admin, false);
  t.not(createdUser.password, password);
  t.is(createdUser.password, createdRecord.password);
});

test('throws an error if no email or password is provided', async (t) => {
  try {
    await createAccount();
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_EMAIL);
  }
});

test('throws an error if the email is missing', async (t) => {
  try {
    await createAccount(undefined, 'paofwjwo3jiao');
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_EMAIL);
  }
});

test('throws an error if the email is not a string', async (t) => {
  try {
    await createAccount(487398489, 'paofwjwo3jiao');
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_EMAIL);
  }
});

test('throws an error if the password is missing', async (t) => {
  try {
    await createAccount('wuutttimanemai');
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_PASSWORD_ERROR);
  }
});

test('throws an error if password is not a string', async (t) => {
  try {
    await createAccount('wuutttimanemai', true);
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_PASSWORD_ERROR);
  }
});

test('throws an error if attempting to create an account with a duplicate email', async (t) => {
  await promisifiedDelay(5000); // run this test after the first one
  try {
    await createAccount(email, '3ur09jf230j90w4');
    t.fail();
  } catch (err) {
    t.is(err.message, DUPLICATE_EMAIL_ERROR);
  }
});

import test from 'ava';
import checkValidLogin from './checkValidLogin';
import createAccount from '../createAccount';
import { runDestroy } from '../../../helpers/database';

import { INVALID_EMAIL } from '../findByEmail';
import { BAD_PASSWORD } from '../checkPasswordsMatch';

const email = 'another@email.com';
const password = 'passwurd';

test.before(async() => {
  await createAccount(email, password);
});

test.after.always(async() => {
  await runDestroy('Account', { email });
});

test('returns true if the credentials match', async (t) => {
  const valid = await checkValidLogin(email, password);
  t.is(valid, true);
});

test('returns false if the password is wrong', async (t) => {
  const valid = await checkValidLogin(email, 'incorrectpassword');
  t.is(valid, false);
});

test('returns false if the user does not exist', async (t) => {
  const valid = await checkValidLogin('other@email.email', 'incorrectpassword');
  t.is(valid, false);
});

test('throws an error if called without arguments', async (t) => {
  try {
    await checkValidLogin();
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_EMAIL);
  }
});

test('throws an error a bad email type is provided', async (t) => {
  try {
    await checkValidLogin(489393, 'awoi3jrw3');
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_EMAIL);
  }
});

test('throws an error if a no password is provided', async (t) => {
  try {
    await checkValidLogin(email);
    t.fail();
  } catch (err) {
    t.is(err.message, BAD_PASSWORD);
  }
});

test('throws an error if a bad password type is provided', async (t) => {
  try {
    await checkValidLogin(email, {});
    t.fail();
  } catch (err) {
    t.is(err.message, BAD_PASSWORD);
  }
});

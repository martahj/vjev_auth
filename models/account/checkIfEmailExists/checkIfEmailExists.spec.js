import test from 'ava';

import checkIfEmailExists from './checkIfEmailExists';
import { runCreate, runDestroy } from '../../../helpers/database';
import { INVALID_EMAIL } from '../findByEmail/findByEmail';

const email = 'omgiman@email.com';
const password = 'j3r98j93f933';

test.before(async() => {
  await runCreate('Account', { email, password });
});

test.after.always(async() => {
  await runDestroy('Account', { email });
});

test('returns true if the email exists in the database', async (t) => {
  const emailExists = await checkIfEmailExists(email);
  t.is(emailExists, true);
});

test('returns false if the email does not exist in the database', async (t) => {
  const emailExists = await checkIfEmailExists('totallydifferentemail@nope.org');
  t.is(emailExists, false);
});

test('throws an error if no email is provided', async (t) => {
  try {
    await checkIfEmailExists();
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_EMAIL);
  }
});

test('throws an error if the email is not a string', async (t) => {
  try {
    await checkIfEmailExists();
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_EMAIL);
  }
});

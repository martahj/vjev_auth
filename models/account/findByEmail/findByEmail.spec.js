import test from 'ava';
import { runCreate, runDestroy } from '../../../helpers/database';
import findByEmail, { INVALID_EMAIL } from './findByEmail';

const email = 'hellooooooo@world.gov';
const password = 'r939wfjw93jwo';

test.before(async() => {
  await runCreate('Account', { email, password });
});

test.after.always(async() => {
  await runDestroy('Account', { email });
});

test('returns a user object if email exists in the database', async(t) => {
  const user = await findByEmail(email);
  t.truthy(user);
  t.is(typeof user, 'object');
  t.is(user.email, email);
  t.is(user.password, password);
  t.is(user.admin, false);
});

test('returns null if the email does not exist', async(t) => {
  const user = await findByEmail('thisisnot@amiracle');
  t.is(user, null);
});

test('errors if an email is not provided', async (t) => {
  try {
    await findByEmail();
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_EMAIL);
  }
});

test('errors if an invalid type is passed', async (t) => {
  try {
    await findByEmail([]);
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_EMAIL);
  }
});

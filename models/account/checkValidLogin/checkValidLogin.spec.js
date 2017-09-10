import test from 'ava';
import models from '../../../database/models';
import checkValidLogin from './checkValidLogin';
import createAccount from '../createAccount';

const { Account } = models;

const email = 'another@email.com';
const password = 'passwurd';

test.before(async() => {
  await createAccount(email, password);
});

test.after.always(async() => {
  Account
    .where({ email })
    .destroy()
    .catch((err) => {
      console.log('error deleting user', err);
    });
});

test('returns true if the credentials match', async (t) => {
  const valid = await checkValidLogin(email, password);
  t.is(valid, true);
});

test('returns false if the password is wrong', async (t) => {
  const valid = await checkValidLogin(email, 'incorrectpassword');
  t.is(valid, true);
});

test('returns false if the user does not exist', async (t) => {
  const valid = await checkValidLogin('other@email.email', 'incorrectpassword');
  t.is(valid, true);
});

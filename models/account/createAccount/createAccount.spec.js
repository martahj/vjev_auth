import test from 'ava';
import models from '../../../database/models';
import createAccount from './createAccount';

const { Account } = models;

const email = 'ok@this.org';
const password = 'blurh';
let saltedPassword;
let admin;

test.after.always(async () => {
  Account
    .where({ email })
    .destroy()
    .catch((err) => {
      console.log('error deleting user', err);
    });
});

test('Returns a user if successfully created', async (t) => {
  const createdUser = await createAccount(email, password);
  t.truthy(createdUser);
  t.is(createdUser.email, email);
  admin = createdUser.admin;
  saltedPassword = createdUser.password;
});

test('Creates a user without admin privledges', (t) => {
  t.is(admin, false);
});

test('salts the password before adding the user to the database', (t) => {
  t.truthy(saltedPassword);
  t.not(saltedPassword, password);
});

test('returns null if no arguments are provided', async (t) => {
  const createdUser = await createAccount();
  t.is(createdUser, null);
});

test('returns null if no email is provided', async (t) => {
  const createdUser = await createAccount(null, 'muhpassword');
  t.is(createdUser, null);
});

test('returns null if no password is provided', async(t) => {
  const createdUser = await createAccount('email@helloworld');
  t.is(createdUser, null);
});

test('returns null if attempting to create an account with a duplicate email', async (t) => {
  const createdUser = await createAccount(email, 'muhpassword');
  t.is(createdUser, null);
});

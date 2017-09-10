import test from 'ava';
import models from '../../../database/models';
import findByEmail from './findByEmail';

const { Account } = models;

const email = 'hello@world.gov';
const password = 'r939wfjw93jwo';

test.before(async() => {
  await new Account({ email, password })
    .save()
    .catch((err) => {
      console.log('Error creating user', err);
    });
});

test.after.always(async() => {
  Account
    .where({ email })
    .destroy()
    .catch((err) => {
      console.log('error deleting user', err);
    });
});

test('returns a user object if email exists in the database', async(t) => {
  const user = await findByEmail(email);
  t.truthy(user);
  t.is(typeof user, 'object');
  t.is(user.email, email);
  t.is(user.admin, false);
});

test('returns null if the email does not exist', async(t) => {
  const user = await findByEmail('thisisnot@amiracle');
  t.is(user, null);
});

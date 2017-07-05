import test from 'ava';
import models from '../../../database/models';
import findByEmail from './findByEmail';

const { Account } = models;

const email = 'hello@world.gov';

test.before(async() => {
  await new Account({ email })
    .save({ email })
    .catch((err) => {
      console.log('Error creating user', err);
    });
});

test.after.always(async() => {
  Account
    .where({ email })
    .destroy()
    .catch((err) => {
      console.log('error deleting', err);
    });
});

test('returns a user object if email exists in the database', async(t) => {
  const user = await findByEmail(email);
  t.truthy(user);
  t.is(typeof user, 'object');
  t.is(user.email, email);
});

test('returns null if the email does not exist', async(t) => {
  const user = await findByEmail('thisisnot@amiracle');
  t.is(user, null);
});

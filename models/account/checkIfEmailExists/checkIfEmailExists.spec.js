import test from 'ava';
import checkIfEmailExists from './checkIfEmailExists';
import models from '../../../database/models';

const { Account } = models;

const email = 'omgiman@email.com';
const password = 'j3r98j93f933';

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

test('returns true if the email exists in the database', async (t) => {
  const emailExists = await checkIfEmailExists(email);
  t.is(emailExists, true);
});

test('returns false if the email does not exist in the database', async (t) => {
  const emailExists = await checkIfEmailExists('totallydifferentemail@nope.org');
  t.is(emailExists, false);
});

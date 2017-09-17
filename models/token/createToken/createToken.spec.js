import test from 'ava';
import createToken, { NO_EMAIL_ERROR, BAD_EMAIL_TYPE_ERROR } from './createToken';

test('creates a token', async (t) => {
  const token = await createToken('email', 6);
  t.truthy(token);
  t.is(typeof token, 'string');
});

test('throws an error if no email is provided', async (t) => {
  try {
    await createToken();
    t.fail();
  } catch (err) {
    t.is(err.message, NO_EMAIL_ERROR);
  }
});

test('throws an error if provided email is not a string', async (t) => {
  try {
    await createToken({ email: 'heeeeyo' });
    t.fail();
  } catch (err) {
    t.is(err.message, BAD_EMAIL_TYPE_ERROR);
  }
});

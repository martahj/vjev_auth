import test from 'ava';
import saltPassword, { INVALID_PASSWORD_ERROR } from './saltPassword';

test('encrypts a password', async(t) => {
  const unencryptedPw = 'p4s$word';
  const encryptedPw = await saltPassword(unencryptedPw);
  t.truthy(encryptedPw);
  t.is(typeof encryptedPw, 'string');
  t.not(unencryptedPw, encryptedPw);
});

test('throws an error if not provided a password', async (t) => {
  try {
    await saltPassword();
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_PASSWORD_ERROR);
  }
});

test('throws an error if not provided an invalid password type', async (t) => {
  try {
    await saltPassword({ password: 'hi' });
    t.fail();
  } catch (err) {
    t.is(err.message, INVALID_PASSWORD_ERROR);
  }
});

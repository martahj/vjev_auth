import test from 'ava';
import saltPassword from '../saltPassword';
import checkPasswordsMatch, { BAD_PASSWORD, BAD_HASHED } from './checkPasswordsMatch';

const unencryptedPw = 'password';
let encryptedPw;

test.before(async () => {
  encryptedPw = await saltPassword(unencryptedPw);
});

test('returns true if passwords match', async(t) => {
  const matches = await checkPasswordsMatch(unencryptedPw, encryptedPw);
  t.is(matches, true);
});

test('returns false if passwords do not match', async(t) => {
  const matches = await checkPasswordsMatch('notright', encryptedPw);
  t.is(matches, false);
});

test('throws an error if called without arguments', async (t) => {
  try {
    await checkPasswordsMatch();
    t.fail();
  } catch (err) {
    t.is(err.message, BAD_PASSWORD);
  }
});

test('throws an error if no password is provided', async (t) => {
  try {
    await checkPasswordsMatch(undefined, 'i4rjo3fi43');
    t.fail();
  } catch (err) {
    t.is(err.message, BAD_PASSWORD);
  }
});

test('throws an error if a non-string password is passed', async (t) => {
  try {
    await checkPasswordsMatch([], 'i4rjo3fi43');
    t.fail();
  } catch (err) {
    t.is(err.message, BAD_PASSWORD);
  }
});

test('throws an error if no hashed value is passed', async (t) => {
  try {
    await checkPasswordsMatch('j3rw09f0j39');
    t.fail();
  } catch (err) {
    t.is(err.message, BAD_HASHED);
  }
});

test('throws an error if the hashed value is not a string', async (t) => {
  try {
    await checkPasswordsMatch('j3rw09f0j39', true);
    t.fail();
  } catch (err) {
    t.is(err.message, BAD_HASHED);
  }
});

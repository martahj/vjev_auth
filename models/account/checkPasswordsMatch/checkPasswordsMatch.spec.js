import test from 'ava';
import saltPassword from '../saltPassword';
import checkPasswordsMatch from './checkPasswordsMatch';

let encryptedPw;

const unencryptedPw = 'password';

test.before(async () => {
  const salted = await saltPassword(unencryptedPw);
  encryptedPw = salted;
});

test('returns true if passwords match', async(t) => {
  const matches = await checkPasswordsMatch(unencryptedPw, encryptedPw);
  t.is(matches, true);
});

test('returns false if passwords do not match', async(t) => {
  const matches = await checkPasswordsMatch('notright', encryptedPw);
  t.is(matches, false);
});

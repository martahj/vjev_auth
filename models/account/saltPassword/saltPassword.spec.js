import test from 'ava';
import saltPassword from './saltPassword';

test('encrypts a password', async(t) => {
  const unencryptedPw = 'p4s$word';
  const encryptedPw = await saltPassword(unencryptedPw);
  t.truthy(encryptedPw);
  t.is(typeof encryptedPw, 'string');
  t.not(unencryptedPw, encryptedPw);
});

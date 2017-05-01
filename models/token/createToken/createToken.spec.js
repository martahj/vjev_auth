import test from 'ava';
import createToken from './createToken';

test(async (t) => {
  await t.notThrows(createToken('testemail', 1));
});

test(async (t) => {
  const token = await createToken('email', 6);
  t.truthy(token);
  t.is(typeof token, 'string');
});

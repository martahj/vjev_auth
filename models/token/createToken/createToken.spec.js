import test from 'ava';
import createToken from './createToken';

test(async (t) => {
  const token = await createToken('email', 6)
                .then(tokenCreated => tokenCreated);
                // .catch(err => throw(err))
  console.log('made token', token);
  t.fail();
});

import test from 'ava';
import { runFetch, runCreate } from '../../../helpers/database';
import deleteToken from './deleteToken';

const token = '3209urj0f9j3943';
const nonexistantToken = 'madeuptokenthatdoesnotexist';

test.before(async() => {
  await runCreate('Token', { token });
});

test('returns true if it worked', async (t) => {
  // Make sure token is actually in database
  const tokenBeforeDelete = await runFetch('Token', { token });
  t.truthy(tokenBeforeDelete);
  t.is(tokenBeforeDelete.token, token);

  // deleteToken returns true
  const deletedToken = await deleteToken(token);
  t.is(deletedToken, true);

  // token is not in database
  const discoveredToken = await runFetch('Token', { token });
  t.is(discoveredToken, null);
});

test('returns true if the token already does not exist', async (t) => {
  // make sure token is not in database
  const nonexistantTokenBeforeDelete = await runFetch('Token', { token: nonexistantToken });
  t.is(nonexistantTokenBeforeDelete, null);

  // still return true - token is gone
  const deletedToken = await deleteToken(nonexistantToken);
  t.is(deletedToken, true);
});

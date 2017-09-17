import test from 'ava';
import { runCreate, runDestroy } from '../../../helpers/database';
import findToken, { NO_TOKEN_ERROR, BAD_TOKEN_TYPE_ERROR } from './findToken';

const token = '3490r430fj90j09j390j043';
const badToken = 'r3903f939j30j0g90j043';

test.before(async() => {
  await runCreate('Token', { token });
});

test.after.always(async() => {
  await runDestroy('Token', { token });
});

test('returns the token if it exists', async (t) => {
  const tokenInDatabase = await findToken(token);
  t.truthy(tokenInDatabase);
  const tokenId = tokenInDatabase.id;
  const tokenToken = tokenInDatabase.token;
  t.truthy(tokenId);
  t.is(typeof tokenId, 'number');
  t.is(tokenToken, token);
});

test('returns null if the token does not exist', async (t) => {
  const tokenInDatabase = await findToken(badToken);
  t.is(tokenInDatabase, null);
});

test('throws error if not passed a token', async (t) => {
  try {
    await findToken();
    t.fail();
  } catch (err) {
    t.is(err.message, NO_TOKEN_ERROR);
  }
});

test('throws an error if provided a value other than a string', async (t) => {
  try {
    await findToken(45);
    t.fail();
  } catch (err) {
    t.is(err.message, BAD_TOKEN_TYPE_ERROR);
  }
});

import test from 'ava';
import { runDestroy, runFetch } from '../../../helpers/database';
import addToken, { NO_TOKEN_ERROR, BAD_TOKEN_TYPE_ERROR } from './addToken';

const token = '23i90rj09jf904933';

test.after.always(async () => {
  await runDestroy('Token', { token });
});

test('returns a token object if the token was added successfully', async (t) => {
  const record = await addToken(token);
  t.truthy(record);
  t.is(record.token, token);
  const databaseRecord = await runFetch('Token', { token });
  t.truthy(databaseRecord);
  t.is(databaseRecord.token, token);
});

test('throws an error if no token is passed', async (t) => {
  try {
    await addToken();
    t.fail();
  } catch (err) {
    t.truthy(err);
    t.is(err.message, NO_TOKEN_ERROR);
  }
});

test('throws an error if a non-string value is passed', async (t) => {
  try {
    await addToken({});
    t.fail();
  } catch (err) {
    t.truthy(err);
    t.is(err.message, BAD_TOKEN_TYPE_ERROR);
  }
});

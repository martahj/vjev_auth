import test from 'ava';
import models from '../../../database/models';
import addToken from './addToken';

const { Token } = models;

const token = '23i90rj09jf904933';

test.after.always(async () => {
  Token
    .where({ token })
    .destroy()
    .catch((err) => {
      console.log('error deleting token', err);
    });
});

test('returns a token object if the token was added successfully', async (t) => {
  const record = await addToken(token);
  t.truthy(record);
  t.is(record.token, token);
  const databaseRecord = await Token.where({ token }).fetch();
  t.truthy(databaseRecord);
  t.is(databaseRecord.token, token);
});

test('returns null if there was an error', async (t) => {
  const record = await addToken();
  t.is(record, null);
});

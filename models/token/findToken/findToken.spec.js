import test from 'ava';
import models from '../../../database/models';
import findToken from './findToken';

const { Token } = models;

const token = '3490r430fj90j09j390j043';
const badToken = 'r3903f939j30j0g90j043';

test.before(async() => {
  await new Token({ token })
    .save()
    .catch((err) => {
      console.log('Error creating token', err);
    });
});

test.after.always(async() => {
  Token
    .where({ token })
    .destroy()
    .catch((err) => {
      console.log('error deleting token', err);
    });
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

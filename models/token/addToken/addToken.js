// @flow
import models from '../../../database/models';
import type { TokenRecord } from '../types';

const { Token } = models;

const addToken = async (token: string): Promise<TokenRecord> => {
  const record = await new Token({ token })
    .save()
    .catch((err) => {
      console.log('error adding token', err);
    });
  return record;
};

export default addToken;

// @flow
// import models from '../../../database/models';
import { runDestroy } from '../../../helpers/database';
// import type { TokenRecord } from '../types';

// const { Token } = models;

const deleteToken = async (token: string): Promise<boolean> => {
  const deleted = await runDestroy('Token', { token });
  // console.log('got deleted', deleted);
  return Boolean(deleted);
};

export default deleteToken;

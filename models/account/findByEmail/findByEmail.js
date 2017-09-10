// @flow
import models from '../../../database/models';
import type { UserRecord } from '../types';

const { Account } = models;

const findByEmail = async (email: string): Promise<UserRecord> => {
  const user = await Account.where({ email }).fetch();
  return user || null;
};

export default findByEmail;

// @flow
import models from '../../../database/models';
import type { UserRecord } from '../types';
import saltPassword from '../saltPassword/';

const { Account } = models;

const createAccount = async (email: string, password: string): Promise<UserRecord> => {
  const saltedPassword = await saltPassword(password);
  const newAccount = await new Account({ email, password: saltedPassword })
    .save()
    .catch((err) => {
      console.log('Error creating user', err);
      return null;
    });
  return newAccount;
};

export default createAccount;

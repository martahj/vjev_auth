// @flow
import models from '../../../database/models';

const { Account } = models;

const findByEmail = async (email: string): boolean => {
  const matchedCount = await Account
                             .where({ email })
                             .fetch();
  return matchedCount ? matchedCount.attributes : null;
};

export default findByEmail;

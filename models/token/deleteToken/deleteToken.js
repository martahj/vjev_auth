// @flow
import { runDestroy } from '../../../helpers/database';

const deleteToken = async (token: string): Promise<boolean> => {
  const deleted = await runDestroy('Token', { token });
  return Boolean(deleted);
};

export default deleteToken;

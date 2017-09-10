// @flow
import findByEmail from '../findByEmail';

const checkIfEmailExists = async (email: string): Promise<boolean> => {
  const user = await findByEmail(email);
  return Boolean(user);
};

export default checkIfEmailExists;

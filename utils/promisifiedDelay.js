// @flow
import promisifiedTimeout from './promisifiedTimeout';
import noop from './noop';

type Noop = () => void;

const promisifiedDelay = (
  millisecondsToWait: number
): Promise<Noop> => promisifiedTimeout(noop, millisecondsToWait);

export default promisifiedDelay;

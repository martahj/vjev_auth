// @flow

const promisifiedTimeout = (
  callback: Function,
  waitMilliseconds: number,
):Promise<Function> => new Promise((resolve) => {
  setTimeout(() => {
    resolve(callback());
  }, waitMilliseconds);
});

export default promisifiedTimeout;

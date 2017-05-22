// @flow

const promisifiedTimeout = (
  callback: Function,
  waitMilliseconds: number,
):Promise<Function> => new Promise((resolve) => {
  setTimeout(() => {
    console.log('calling cb');
    resolve(callback());
  }, waitMilliseconds);
});

export default promisifiedTimeout;

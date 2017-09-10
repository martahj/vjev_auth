// @flow

export type Token = string;

// TODO timestamps
export type TokenRecord = {
  id: number,
  token: string,
};

export type Email = string;

export type Password = string;

// TODO timestamps
export type UserRecord = {
  id: number,
  admin: boolean,
  email: string,
  password: string,
};

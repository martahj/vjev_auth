// @flow
import selectn from 'selectn';
import models from '../database/models';

const { Token, Account } = models;

const modelMap = {
  Token,
  Account,
};

type ModelType = 'Token' | 'Account';

export const runFetch = async (model: ModelType, attr: Object): Promise<?Object> => {
  try {
    const fetched = await modelMap[model].where(attr).fetch();
    const attributes = selectn('attributes', fetched);
    const hasAttributes = attributes && Object.keys(attributes).length;
    return hasAttributes ? attributes : null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const runDestroy = async (model: ModelType, attr: Object): Promise<?Object> => {
  try {
    const destroyed = await modelMap[model].where(attr).destroy();
    const attributes = selectn('attributes', destroyed);
    return attributes || null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const runCreate = async(model: ModelType, attr: Object): Promise<?Object> => {
  try {
    const created = await new modelMap[model](attr).save();
    const attributes = selectn('attributes', created);
    return attributes || null;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

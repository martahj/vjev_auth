import bookshelf from './bookshelf';

/* eslint-disable no-use-before-define */

const Account = bookshelf.Model.extend({
  tableName: 'accounts',
  tokens() {
    return this.hasMany(Token, '');
  },
}, {
  dependents: [
    {
      name: 'tokens',
      keyOverrides: {
        foreignKey: 'id',
      },
    },
  ],
});

const Token = bookshelf.Model.extend({
  tableName: 'tokens',
  user() {
    return this.belongsTo(Account);
  },
});

const Event = bookshelf.Model.extend({
  tableName: 'events',
});

export default {
  Account,
  Token,
  Event,
};

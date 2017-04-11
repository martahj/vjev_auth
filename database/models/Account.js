import bookshelf from '../bookshelf';

const Account = bookshelf.Model.extend({
  tableName: 'accounts',
  tokens: () => this.hasMany(Token),
}, {
  dependents: ['tokens'],
});

export default Account;

import bookshelf from '../bookshelf';

const Token = bookshelf.Model.extend({
  tableName: 'tokens',
  user: () => this.belongsTo(Account),
});

export default Token;

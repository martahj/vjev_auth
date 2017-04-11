// import Knex from 'knex';
// import Bookshelf from 'bookshelf';
// import bookshelfCascadeDelete from 'bookshelf-cascade-delete';
// import knexConfig from '../knexfile';
// // import models from './models';
//
// const knex = Knex(knexConfig);
// const bookshelf = Bookshelf(knex);
// bookshelf.plugin(bookshelfCascadeDelete);
//
// export const Account = bookshelf.Model.extend({
//   tableName: 'accounts',
//   tokens: () => this.hasMany(Token),
// }, {
//   dependents: ['tokens'],
// });
//
// export const Token = bookshelf.Model.extend({
//   tableName: 'tokens',
//   user: () => this.belongsTo(Account),
// });

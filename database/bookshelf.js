import Knex from 'knex';
import Bookshelf from 'bookshelf';
import bookshelfCascadeDelete from '../../../open-source/bookshelf-cascade-delete/src/index';
import knexConfig from './knexfile';

// console.log('bookshelfCascadeDelete', bookshelfCascadeDelete);

const knex = Knex(knexConfig[process.env.NODE_ENV]);
const bookshelf = Bookshelf(knex);
bookshelf.plugin(bookshelfCascadeDelete);

export default bookshelf;

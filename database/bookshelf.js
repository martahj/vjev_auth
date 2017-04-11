import Knex from 'knex';
import Bookshelf from 'bookshelf';
import bookshelfCascadeDelete from 'bookshelf-cascade-delete';
import knexConfig from '../knexfile';

const knex = Knex(knexConfig);
const bookshelf = Bookshelf(knex);
bookshelf.plugin(bookshelfCascadeDelete);

export default bookshelf;

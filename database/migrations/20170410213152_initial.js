
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('accounts', (table) => {
      table.increments('id').primary();
      table.boolean('admin');
  	  table.string('email').unique();
  	  table.string('password');
      table.timestamps();
    }),
    knex.schema.createTable('tokens', (table) => {
      table.increments('id').primary();
      table.string('token');
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('tokens'),
    knex.schema.dropTable('accounts'),
  ]);
};

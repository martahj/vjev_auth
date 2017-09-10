
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('accounts', (table) => {
      table.increments('id').primary();
      table.boolean('admin').defaultTo(false).notNullable();
  	  table.string('email').unique().notNullable();
  	  table.string('password').notNullable();
      table.timestamps();
    }),
    knex.schema.createTable('tokens', (table) => {
      table.increments('id').primary();
      table.string('token').notNullable();
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

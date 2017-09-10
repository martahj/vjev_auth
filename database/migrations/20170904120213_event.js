
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.date('startDate').notNullable();
      table.date('endDate').notNullable();
      table.string('link').nullable();
      table.string('desc').nullable();
      table.string('location').notNullable();
      table.boolean('special').defaultTo(false).notNullable();
      table.boolean('featured').defaultTo(false).notNullable();
      table.string('imageUrl').nullable();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('events'),
  ]);
};

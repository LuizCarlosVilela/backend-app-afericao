exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    //Id auto incremente
    table.increments().primary();
    table.string('name').notNullable();

    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('wallet_validate').notNullable();
    table.string('permissions').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('user');
};

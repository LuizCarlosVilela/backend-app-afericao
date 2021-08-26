exports.up = function (knex) {
  return knex.schema.createTable('wallet', (table) => {
    //Id auto incremente
    table.increments().primary();
    table.string('name_user').notNullable();
    table.string('number_registration').notNullable();
    table.string('date_emission').notNullable();
    table.string('unity_federation').notNullable();
    table.string('city').notNullable();
    table.string('agency').notNullable();
    table.string('status').notNullable();
    table.string('date_validate').notNullable();

    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('wallet');
};

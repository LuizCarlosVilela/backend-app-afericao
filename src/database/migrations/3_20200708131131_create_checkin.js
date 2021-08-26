exports.up = function (knex) {
  return knex.schema.createTable('check', (table) => {
    //Id auto incremente
    table.increments().primary();
    table.string('user_url').notNullable();
    table.string('user_latitude').notNullable();
    table.string('user_longitude').notNullable();
    table.string('place_car').notNullable();
    table.string('url_car').notNullable();
    table.string('date_check').notNullable();

    table.string('adress_check').notNullable();

    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('check');
};

exports.up = function (knex) {
  return knex.schema.createTable('solicitation', (table) => {
    table.increments().primary();

    table.string('name').notNullable();
    table.string('cpf').notNullable();
    table.string('rg').notNullable();
    table.string('adress').notNullable();
    table.string('url_rg').notNullable();
    table.string('url_cpf').notNullable();
    table.string('residency').notNullable();
    table.string('sickness').notNullable();
    table.string('status').notNullable();
    table.string('avatar').notNullable();

    table.string('url_user_face').notNullable();
    table.string('url_rg_verse').notNullable();

    table.string('solicitation_date').notNullable();
    table.string('mensage_validation').notNullable();

    table.integer('user_id').notNullable();
    table.foreign('user_id').references('id').inTable('user');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('solicitation');
};

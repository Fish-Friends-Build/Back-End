
exports.up = function(knex) {
  return (
    knex.schema
      .createTable('journals', tbl => {
        tbl.increments();
        tbl.integer('userId')
          .unsigned()
          .notNullable()
          .references('users.id')
          .onUpdate('CASCADE')
          .onUpdate('CASCADE');
        tbl.integer('numFishCaught').notNullable();
        tbl.date('date').notNullable();
        tbl.string('timeOfDay').notNullable();
        tbl.string('location').notNullable();
        tbl.string('fishType');
        tbl.string('bait');
        tbl.text('bankOrBoat').notNullable();
        tbl.text('waterType').notNullable();
        tbl.string('notes');
      })
  );
};

exports.down = function(knex) {
  return (
    knex.schema
      .dropTableIfExists('journals')
  );
};

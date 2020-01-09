
exports.seed = function(knex) {
  return knex('journals').del()
    .then(function () {
      return knex('users').del();
    });
};

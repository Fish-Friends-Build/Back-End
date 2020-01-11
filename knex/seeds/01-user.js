const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').insert([
    { username: 'aciel_och', password: bcrypt.hashSync('ace2020') }
  ]);
};

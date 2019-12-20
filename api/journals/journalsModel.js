const db = require('../../knex/dbConfig.js');

module.exports = {
  find,
  findBy,
  insert,
  update,
  remove
};

function find() {
  return db('journals');
}

function findBy(id) {
  return db('journals').where(id);
}

function insert(journal) {
  return db('journals').insert(journal, ['*']);
}

function update(id, update) {
  return db('journals')
    .where({ id })
    .update(update, ['*']);
}

function remove(id) {
  return db('journals').where({ id }).del();
}
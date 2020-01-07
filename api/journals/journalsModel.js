const db = require('../../knex/dbConfig.js');

module.exports = {
  find,
  findBy,
  insert,
  update,
  remove
};

function find() {
  return db('journals as j')
    .join('users as u', { 'j.userId': 'u.id' })
    .select(
      'j.id',
      'u.username',
      'j.numFishCaught',
      'j.date',
      'j.timeOfDay',
      'j.location',
      'j.fishType',
      'j.bait',
      'j.bankOrBoat',
      'j.waterType',
      'j.notes'
    );
}

function findBy(id) {
  return db('journals as j')
    .where(id)
    .join('users as u', { 'j.userId': 'u.id' })
    .select(
      'j.id',
      'u.username',
      'j.numFishCaught',
      'j.date',
      'j.timeOfDay',
      'j.location',
      'j.fishType',
      'j.bait',
      'j.bankOrBoat',
      'j.waterType',
      'j.notes'
    );
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
const db = require('../../knex/dbConfig.js');

module.exports = {
    findBy,
    insert
};

function findBy(user) {
    return db('users').where(user);
};

function insert(user) {
    return db('users').insert(user, ['*']);
};

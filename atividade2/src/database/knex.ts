import knex from 'knex';
const config = require('../knexfile.js');

export const db = knex(config.development);

/* eslint-disable no-undef */
const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'dauvnir',
	password: 'dauvnir',
	host: 'localhost',
	port: 5432,
	database: 'manhwa_list',
});

module.exports = pool;

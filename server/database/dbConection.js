const mysql = require("mysql");
const { promisify } = require("util");

//Inicialization of db
const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	database: process.env.MYSQL_DB,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	multipleStatements: true,
});

//Connection and errors
pool.getConnection((err, connection) => {
	if (err) {
		if (err.code === "PROTOCOL_CONNECTION_LOST") {
			console.error("Database disconected");
		}
		if (err.code === "ER_CON_COUNT_ERROR") {
			console.error("Database has to many connection");
		}
		if (err.code === "ECONNREFUSED") {
			console.error("Database connection was wrong");
		}
		console.error(err);
	}
	if (connection) {
		connection.release();
		console.log("Database is connected");
	}
	return;
});

//Change the mysql js callbacks to promises
pool.query = promisify(pool.query);

module.exports = pool;

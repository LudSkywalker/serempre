if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}
const pool = require("./dbConection");
const fs = require("fs");
const ctj = require("csvtojson");
const sqlPath =
	__dirname.split("/server")[0] + "/db/sql/serempreDBinServer.sql";
const creationQuery = fs.readFileSync(sqlPath, "utf8");
const dataFolderPath = __dirname.split("/server")[0] + "/db/data";

(async () => {
	let tables = fs.readdirSync(dataFolderPath);
	for (let i = tables.length - 1; i >= 0; i--) {
		table = tables[i].split(".")[1];
		await pool.query("DROP TABLE IF EXISTS " + table);
	}
	await pool.query(creationQuery);
	for (let i = 0; i < tables.length; i++) {
		let data = await ctj().fromFile(dataFolderPath + "/" + tables[i]);
		table = tables[i].split(".")[1];
		console.log(table);
		for (let j = 0; j < data.length; j++) {
			let keyValue = Object.entries(data[j]);
			for (let k = 0; k < keyValue.length; k++) {
				if (keyValue[k][1] == "") {
					delete data[j][keyValue[k][0]];
				}
			}
			await pool.query("INSERT INTO " + table + " SET ?", data[j]);
		}
	}
	await pool.end();
})();

if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}
const pool = require("./dbConection");
const fs = require("fs");
const sqlPath =
	__dirname.split("/server")[0] + "/db/sql/serempreDBinServer.sql";
const dataFolderPath = __dirname.split("/server")[0] + "/db/data";
const creationQuery = fs.readFileSync(sqlPath, "utf8");
var query = "";
function isHex(num) {
	return Boolean(num.match(/^0x[0-9a-f]+$/i))
  }

(async () => {
	let tables = fs.readdirSync(dataFolderPath);
	for (let i = tables.length - 1; i >= 0; i--) {
		table = tables[i].split(".")[1];
		query += "DROP TABLE IF EXISTS " + table + ";";
	}
	query += creationQuery;
	for (let i = 0; i < tables.length; i++) {
		table = tables[i].split(".")[1];
		let dataPure = fs.readFileSync(
			dataFolderPath + "/" + tables[i],
			"utf8"
		);
		let data = "";
		let inComillasEnter = false;
		for (let k = 0; k < dataPure.length; k++) {
			if (dataPure[k] == '"') {
				inComillasEnter = !inComillasEnter;
			}
			if (inComillasEnter && dataPure[k] == "\n") {
				data += " ";
			} else if (typeof dataPure[k] !== undefined) {
				data += dataPure[k];
			}
		}
		data = data.split("\n");
		if (data[1]) {
			query += "INSERT INTO " + table + " (" + data[0] + ")\n VAlUES ";
			for (let j = 1; j < data.length; j++) {
				let values = "";
				let inComillas = false;
				for (let k = 0; k < data[j].length; k++) {
					if (data[j][k] == '"') {
						inComillas = !inComillas;
					}
					if (inComillas && data[j][k] == ",") {
						values += ";.;";
					} else if (typeof data[j][k] !== undefined) {
						values += data[j][k];
					}
				}
				values = values.replace(/"/g, "").split(",");
				let value = "";
				for (let k = 0; k < values.length; k++) {
					if (k > 0) {
						value += ",";
					}
					if (values[k] == "") {
						value += "NULL";
					} else if (isHex(values[k])) {
						value +=(values[k]);
					} else if (!isNaN(values[k])) {
						value += parseFloat(values[k]);
					} else {
						value += '"' + values[k] + '"';
					}
				}
				if (value != "NULL") {
					if (j > 1) {
						query += ",";
					}
					query += "(" + value.replace( /;.;/g,",") + ")\n";
				}
			}
			query += ";\n";
		}
	}
	fs.writeFileSync("quer.sql",query)
	await pool.query(query);
	await pool.end();
})();

const pool = require("../../database/dbConection");
const formatSupplier = require("./formatSupplier");
module.exports = async (req, res) => {
	({ id = "" } = req.params);
	id = id.replace(/"/g, "");
	let searchQuery = `SELECT SupplierID FROM Suppliers WHERE SupplierID=` + id;
	let idExist = await pool.query(searchQuery);
	if (!idExist[0]) {
		response = {
			deleted: false,
			message: "Not exist an element with the id=" + id,
		};
		res.json(response);
		return;
	}
	let query =
		`UPDATE Products SET SupplierID=NULL WHERE SupplierID=` +
		id +
		`;
		DELETE FROM Suppliers 
	WHERE SupplierID=` +
		id;
	let deleted = await pool.query(query).catch((err) => {
		console.log(err);
		res.status(400);
		res.json({
			deleted: false,
			error: err.sqlMessage,
		});
	});
	if (res.statusCode == 400) {
		return;
	}
	response = {
		deleted: deleted[1].serverStatus == 2 ? true : false,
		message: deleted[1]
			? deleted.message
			: req.message(err.message.sqlMessage),
	};
	res.json(response);
};

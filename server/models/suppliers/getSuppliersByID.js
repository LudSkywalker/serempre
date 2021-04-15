const pool = require("../../database/dbConection");
const formatSupplier = require("./formatSupplier");
module.exports = async (req, res) => {
	({ id = "" } = req.params);
	id = id.replace(/"/g, "");
	let query =
		`
	SELECT * FROM Suppliers 
	WHERE SupplierID =` + id;

	let items = await pool.query(query);
	items=items[0]? formatSupplier(items[0]):[{}]
	res.json(items); 
};

const pool = require("../../database/dbConection");
const formatProduct = require("./formatProduct");
module.exports = async (req, res) => {
	({ id = "" } = req.params);
	id = id.replace(/"/g, "");
	let query =
		`
	SELECT * FROM Products p
	JOIN Categories c ON p.CategoryID=c.CategoryID
	JOIN Suppliers s ON p.SupplierID=s.SupplierID
	WHERE p.ProductID =` + id;

	let items = await pool.query(query);

	items= formatProduct(items[0])
	res.json(items);
};

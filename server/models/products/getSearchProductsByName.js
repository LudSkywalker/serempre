const pool = require("../../database/dbConection");
const formatProduct = require("./formatProduct");
module.exports = async (req, res) => {
	({ productName = "", categoryName = "", supplierName = "" } = req.query);
	productName = productName.replace(/"/g, "");
	categoryName = categoryName.replace(/"/g, "");
	supplierName = supplierName.replace(/"/g, "");
	if (
		productName[0] == null &&
		categoryName[0] == null &&
		supplierName[0] == null
	) {
		res.status(400);
		res.json({
			error:
				"Request params fail in productName=='' categoryName=='' supplierName=='', at least a parameter  need to have text",
		});
		return;
	}
	let query = `
	SELECT * FROM Products p
	JOIN Categories c ON p.CategoryID=c.CategoryID
	JOIN Suppliers s ON p.SupplierID=s.SupplierID
	WHERE `;
	let haveOr = false;
	if (productName[0] != null) {
		query += `p.ProductName LIKE '%` + productName + `%' `;
		haveOr = true;
	}
	if (categoryName[0] != null) {
		query += haveOr ? " or " : "";
		query += `c.CategoryName LIKE '%` + categoryName + `%'`;
		haveOr = true;
	}
	if (supplierName[0] != null) {
		query += haveOr ? " or " : "";
		query +=
			`s.CompanyName LIKE '%` +
			supplierName +
			`%' or s.ContactName LIKE '%` +
			supplierName +
			`%' or s.ContactTitle LIKE '%` +
			supplierName +
			`%'`;
	}
	let items = await pool.query(query);
	for (let i = 0; i < items.length; i++) {
		items[i]=formatProduct(items[i])
	}
	res.json(items);
};

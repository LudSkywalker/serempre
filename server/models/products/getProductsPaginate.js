const pool = require("../../database/dbConection");
const formatProduct = require("./formatProduct");
module.exports=async (req, res) => {
	({ pag = "1", width = "1", asc = "true" } = req.query);
	pag = pag.replace(/"/g, "");
	width = width.replace(/"/g, "");
	asc = asc.replace(/"/g, "");
	if (pag == "0") {
		res.status(400);
		res.json({
			error: "Request params fail in pag=0, pages start in 1, can't be 0",
		});
		return;
	}

	let ascQuery = asc == "true" ? "ASC" : "DESC";
	let query =
		`SELECT COUNT(ProductID) AS total FROM Products;
	SELECT * FROM Products p
	JOIN Categories c ON p.CategoryID=c.CategoryID
	JOIN Suppliers s ON p.SupplierID=s.SupplierID
	ORDER BY ProductID ` +
		ascQuery +
		` 
	LIMIT ` +
		width +
		` OFFSET ` +
		(parseInt(pag) - 1) * parseInt(width);
	let productList = await pool.query(query);
	let items = productList[1];
	for (let i = 0; i < items.length; i++) {
		items[i]= formatProduct(items[i])
	}

	let response = {
		currentPage: parseInt(pag),
		items,
		perPage:parseInt(width),
		total: productList[0][0].total,
	};
	res.json(response);
}
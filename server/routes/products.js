const { Router } = require("express");
const products = Router();
const pool = require("../database/dbConection");

products.get("/products?", async (req, res) => {
	({ pag = "1", width = "1", asc = "true" } = req.query);
	if (pag == "0") {
		res.status(400);
		res.json({
			error: "Request params fail in pag=0,pages start in 1, can't be 0",
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
	//bufToHex=(buffer)=>([...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase());
	for (let i = 0; i < items.length; i++) {
		let Category = {
			CategoryID: items[i].CategoryID,
			CategoryName: items[i].CategoryName,
			Description: items[i].Description,
			//Picture: bufToHex(new Buffer( items[i].Picture)),
			Picture: new Buffer( items[i].Picture).toString('base64'),
		};
		delete items[i].CategoryName;
		delete items[i].Description;
		delete items[i].Picture;
		items[i].Category = Category;
		
		let Suppliers = {
			SupplierID: items[i].SupplierID,
			CompanyName: items[i].CompanyName,
			ContactName: items[i].ContactName,
			ContactTitle: items[i].ContactTitle,
			Address:{
				Street:items[i].Address,
				City: items[i].City,
				Region: items[i].Region,
				PostalCode: items[i].PostalCode,
				Country: items[i].Country,
				Phone: items[i].Phone,
			},
				
			Description: items[i].Description,
			Fax: items[i].Fax,
			HomePage: items[i].HomePage,
		};
		delete items[i].CompanyName;
		delete items[i].ContactName;
		delete items[i].ContactTitle;
		delete items[i].Address;
		delete items[i].City;
		delete items[i].Region;
		delete items[i].PostalCode;
		delete items[i].Country;
		delete items[i].CategoryName;
		delete items[i].Phone;
		delete items[i].Fax;
		delete items[i].HomePage;
		items[i].Suppliers = Suppliers;
	}

	let response = {
		currentPage: parseInt(pag),
		items,
		perPage:parseInt(width),
		total: productList[0][0].total,
	};
	res.json(response);
});

module.exports = products;

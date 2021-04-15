const pool = require("../../database/dbConection");
module.exports = async (req, res) => {
	({ id = "" } = req.params);
	({ pag = "1", width = "1" } = req.query);
	id = id.replace(/"/g, "");
	pag = pag.replace(/"/g, "");
	width = width.replace(/"/g, "");
	let query =
		`
        SELECT COUNT(p.ProductID) AS total  FROM Categories c 
        RIGHT JOIN Products p 
        ON c.CategoryID=p.CategoryID 
        WHERE c.CategoryID=` +
		id +
		`;
        SELECT * FROM Categories c 
        RIGHT JOIN Products p 
        ON c.CategoryID=p.CategoryID 
        JOIN Suppliers s 
        ON p.SupplierID=s.SupplierID
        WHERE c.CategoryID=` +
		id +
		`
        LIMIT ` +
		width +
		` OFFSET ` +
		(parseInt(pag) - 1) * parseInt(width);
	let productList = await pool.query(query);
	let data = productList[1];
	let items = {};
	items.CategoryID = data[0].CategoryID;
	items.CategoryName = data[0].CategoryName;
	items.Description = data[0].Description;
	items.Picture = data[0].Picture
		? Buffer.from(data[0].Picture).toString("base64")
		: null;
	items.Products = [];
	for (let i = 0; i < data.length; i++) {
		delete data[i].CategoryID;
		delete data[i].CategoryName;
		delete data[i].Description;
		delete data[i].Picture;
		let Products = {
			ProductID: data[i].ProductID,
			ProductName: data[i].ProductName,
			SupplierID: data[i].SupplierID,
			QuantityPerUnit: data[i].QuantityPerUnit,
			UnitPrice: data[i].UnitPrice,
			UnitsInStock: data[i].UnitsInStock,
			UnitsOnOrder: data[i].UnitsOnOrder,
			ReorderLevel: data[i].ReorderLevel,
			Discontinued: data[i].Discontinued,
		};
		delete data[i].ProductID;
		delete data[i].ProductName;
		delete data[i].SupplierID;
		delete data[i].QuantityPerUnit;
		delete data[i].UnitPrice;
		delete data[i].UnitsInStock;
		delete data[i].UnitsOnOrder;
		delete data[i].ReorderLevel;
		delete data[i].Discontinued;
		items.Products[i] = Products;

		let Suppliers = {
			SupplierID: data[i].SupplierID,
			CompanyName: data[i].CompanyName,
			ContactName: data[i].ContactName,
			ContactTitle: data[i].ContactTitle,
			Address: {
				Street: data[i].Address,
				City: data[i].City,
				Region: data[i].Region,
				PostalCode: data[i].PostalCode,
				Country: data[i].Country,
				Phone: data[i].Phone,
			},

			Description: data[i].Description,
			Fax: data[i].Fax,
			HomePage: data[i].HomePage,
		};
		delete data[i].SupplierID;
		delete data[i].CompanyName;
		delete data[i].ContactName;
		delete data[i].ContactTitle;
		delete data[i].Address;
		delete data[i].City;
		delete data[i].Region;
		delete data[i].PostalCode;
		delete data[i].Country;
		delete data[i].CategoryName;
		delete data[i].Phone;
		delete data[i].Fax;
		delete data[i].HomePage;
		items.Products[i].Suppliers = Suppliers;
	}

	let response = {
		currentPage: parseInt(pag),
		items,
		perPage: parseInt(width),
		total: productList[0][0].total,
	};
	res.json(response);
};

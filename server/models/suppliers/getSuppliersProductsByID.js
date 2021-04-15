const pool = require("../../database/dbConection");
const formatSupplier = require("./formatSupplier");
module.exports = async (req, res) => {
	({ id = "" } = req.params);
	id = id.replace(/"/g, "");
	let query =
		`
	SELECT s.*,p.ProductID,p.ProductName,c.CategoryID,c.CategoryName 
	FROM Suppliers s
	RIGHT JOIN Products p 
	on s.SupplierID=p.SupplierID
	JOIN Categories c 
	on p.CategoryID=c.CategoryID
	WHERE s.SupplierID =` + id;
	let items = await pool.query(query);
	let Products=[];
	for (let i = 0; i < items.length; i++) {
		Products[i]= {
			ProductID: items[i].ProductID,
			ProductName: items[i].ProductName,
			CategoryID: items[i].CategoryID,
			CategoryName: items[i].CategoryName,
		};
	}
	items=items[0]? formatSupplier(items[0]):[{}]
	items[0]?items.Products=Products:"";
	res.json(items); 
};

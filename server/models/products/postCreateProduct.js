const pool = require("../../database/dbConection");
module.exports = async (req, res) => {
	let queryID =`SELECT COUNT(*) AS total FROM Products;`
	let totalRows =await pool.query(queryID);
	req.body.ProductID=totalRows[0].total+1;
	let query =`INSERT INTO Products SET ?`;

	let created= await pool.query(query,req.body);
	let response={
		created:(created.serverStatus==2)?true:false,
		message:created.message,
	}
	res.json(response);
};

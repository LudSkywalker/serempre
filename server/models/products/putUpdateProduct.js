const pool = require("../../database/dbConection");
module.exports = async (req, res) => {
	({ id = "" } = req.params);
	id = id.replace(/"/g, "");
	let query = `UPDATE Products SET ? WHERE ProductID=`+id;
	let updated = await pool.query(query,req.body)
	if(res.statusCode==400){
		return
	}
	response = {
		updated: updated.serverStatus == 2 ? true : false,
		message: updated.message,
	};
	res.json(response);
};

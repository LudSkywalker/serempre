if (process.env.NODE_ENV != "production") {
	require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

//Instans of server
const app = express();

//Settings of server
app.set("json spaces", 2);
app.set("port", process.env.PORT || 3000);

//Implement of middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"));



//Implement if routes
app.use("/api", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/suppliers", require("./routes/suppliers"));

(async () => {
	await app.listen(app.get("port"));
	console.log("Sever on port", app.get("port"));
})();

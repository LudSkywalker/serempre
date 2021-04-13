if (process.env.NODE_ENV!="production"){
    require("dotenv").config();
}
const express = require("express");
const middlewares = require("./middlewares");

//Instans of server
const app = express();

//Settings of server
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);

//Implement of middlewares
app.use(middlewares);

//Implement if routes
app.use("/api/products", require("./routes/products"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/suppliers", require("./routes/suppliers"));

app.listen(app.get("port"), () => {
	console.log("Sever on port", app.get("port"));
});

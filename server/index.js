const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app=express();

//MIDDLEWARES
app.use(morgan("dev"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
//config cors to enable fetch 
app.use(cors());



app.listen(3000);


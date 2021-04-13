const {Router}=require("express")
const products= Router();
const pool = require("../dbConection");

products.get("/",(req,res)=>{
    res.send("hola")
})

module.exports=products;
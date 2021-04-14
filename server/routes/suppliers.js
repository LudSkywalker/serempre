const {Router}=require("express")
const pool = require("../database/dbConection");
const suppliers= Router();

suppliers.get("/",(req,res)=>{
    res.send("hola")
})

module.exports=suppliers;
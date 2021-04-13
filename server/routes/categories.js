const {Router}=require("express")
const categories= Router();
const pool = require("../dbConection");

categories.get("/",(req,res)=>{
    res.send("hola")
})

module.exports=categories;
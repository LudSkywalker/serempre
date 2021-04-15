const {Router}=require("express")
const categories= Router();
const getCategoryProducts= require("../models/categories/getCategoryProducts");

categories.get("/:id/products",getCategoryProducts)

module.exports=categories;
const { Router } = require("express");
const products = Router();
const getProductsPaginate =require("../models/products/getProductsPaginate");
const getSearchProductsByName =require("../models/products/getSearchProductsByName");
const getSearchProductsById =require("../models/products/getSearchProductsById");
const postCreateProduct = require("../models/products/postCreateProduct");
const putUpdateProduct = require("../models/products/putUpdateProduct");


products.get("/products?", getProductsPaginate);
products.get("/products/search?", getSearchProductsByName);
products.get("/products/:id", getSearchProductsById);
products.post("/products",postCreateProduct );
products.put("/products/:id",putUpdateProduct );

module.exports = products;

const { Router } = require("express");
const deleteSuppliersByID = require("../models/suppliers/deleteSuppliersByID");
const suppliers = Router();
const getSuppliersByID = require("../models/suppliers/getSuppliersByID");
const getSuppliersProductsByID = require("../models/suppliers/getSuppliersProductsByID");

suppliers.get("/:id/products",getSuppliersProductsByID);
suppliers.get("/:id",getSuppliersByID);
suppliers.delete("/:id",deleteSuppliersByID);

module.exports = suppliers;

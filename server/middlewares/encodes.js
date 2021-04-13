const {urlencoded,json} = require("express");
module.exports.urlencoded=urlencoded({ extended: false });
module.exports.json=json();
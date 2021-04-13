const cors = require("./middlewares/cors")
const encodes = require("./middlewares/encodes")
const morgan = require("./middlewares/morgan")
module.exports=function(res,req,next){
    cors(res,req,next);
    morgan(res,req,next);
    encodes.urlencoded(res,req,next);
    encodes.json(res,req,next)
    next();
};
const  {Router}=require("express");
const {getBalance,transferBalance}=require("../controllers/account.controller")
const {authMiddleware}=require("../middlewares/usermiddleware");
const accountRoutes=Router();
accountRoutes.route('/balance').get(authMiddleware,getBalance);
accountRoutes.route('/transfer').post(authMiddleware,transferBalance);
module.exports=accountRoutes;

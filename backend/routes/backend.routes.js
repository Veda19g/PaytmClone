const  {Router}=require("express");
const userRoutes=require("./user.routes");
const accountRoutes=require("./accounts.route");
const backendroutes=Router();

backendroutes.use('/user',userRoutes);
backendroutes.use('/account',accountRoutes);
module.exports=backendroutes;
const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

   userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   balance:{
    type:Number,
    required:true
   }
});

const Account=mongoose.model("Account",userSchema);

module.exports=Account;
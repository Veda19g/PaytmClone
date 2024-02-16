const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    firstName:{
        type:String,
        required:true,
        trim: true,
        maxLength: 50
        
    },
    lastName:{
        type:String,
        required:true,
        trim: true,
        maxLength: 50
    },
    password:{
        type:String,
        required:true,
        minLength: 6
    }
});

UserSchema.pre("save", async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

const User=new mongoose.model("User",UserSchema);

module.exports=User;
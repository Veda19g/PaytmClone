const {z}=require("zod");
const User=require("../models/User.model");
const Account=require("../models/useraccount.model")
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../utils/auth");
require('dotenv').config();

const signupSchema=z.object({
    username: z.string().email(), 
    password: z.string().min(6),
    firstName: z.string().max(50),
    lastName: z.string().max(50)
});

const signup=async(req,res)=>{

const {username,password,firstName,lastName}=req.body;

try{
    
     signupSchema.parse(req.body);

     const existingUser=await User.findOne({
        username
     });
   
     if(existingUser){
        return res.status(400).json({
            message:"user already registered"
        })
     }

     newUser=await User.create({username,password,firstName,lastName});
    
    const userId=newUser._id
    
    const accessToken=generateAccessToken(userId);
    const refreshToken=generateRefreshToken(userId);
    
    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:'None',
        secure:true
    })

    res.cookie('accessToken',accessToken,{
        httpOnly:true,
        sameSite:'None',
        secure:true
    })
    
     await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
     
     res.status(200).json({
        message:"user registered succesfully",
        user:newUser
     })

}catch(err){
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}   


}

const loginSchema=z.object({
    username: z.string().email(),
    password:z.string().min(6)
});

const signin=async (req,res)=>{

  const {username,password}=req.body;


  try {
    // Validate request body
    loginSchema.parse(req.body);

    // Find the user by username
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
        return res.status(400).json({ message: "User is not registered" });
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const userId=existingUser._id;

    const accessToken=generateAccessToken(userId);
    const refreshToken=generateRefreshToken(userId);
    
    res.cookie('accessToken',accessToken,{
        httpOnly:true,
        sameSite:'None',
        secure:true
    })

    res.cookie('refreshToken',refreshToken,{
        httpOnly:true,
        sameSite:'None',
        secure:true
    })



    // Send token in response
    res.status(200).json({ message:"wlcome back user",existingUser });

} catch (err) {
    // Handle validation errors or other errors
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
}


}

const updateschema=z.object({
    password:z.string().min(6),
    firstName:z.string(),
    lastName:z.string()
})


const updateDetails = async (req, res) => {
    const { password, firstName, lastName } = req.body;

    try {
        updateschema.parse(req.body);

        // Construct update object
        const updates = {};
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updates.password = hashedPassword;
        }
        if (firstName) updates.firstName = firstName;
        if (lastName) updates.lastName = lastName;

        // Update user details
        await User.updateOne({ _id: req.userId }, updates);

        res.json({
            message: "Updated successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getUsers=async(req,res)=>{
    const filter=req.query.filter || "";
    const users = await User.find({
        $and: [
            {
                $or: [
                    { firstName: { "$regex": filter } },
                    { lastName: { "$regex": filter } }
                ]
            },
            {
                _id: { $ne: req.userId } // Exclude the current user's ID
            }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
    
}

const getuserDetails = async (req, res) => {
    console.log(req.userId);
    try {
        // Find the account based on req.userId and populate the userId field
        const account = await Account.findOne({ userId: req.userId }).populate('userId');

        // If account not found, return error
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Extract user details from populated field
        const user = account.userId;

        // Send user details with account balance
        res.json({
            firstName: user.firstName,
            lastName: user.lastName,
            balance: account.balance
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports={signup,signin,updateDetails,getUsers,getuserDetails}
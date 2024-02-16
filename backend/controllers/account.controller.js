const Account=require("../models/useraccount.model");

const getBalance=async(req,res)=>{

       const account=await Account.findOne({
        userId:req.userId
       });

       res.json({
        balance: account.balance
       })


}

const transferBalance=async(req,res)=>{
   
    const { amount, to } = req.body;
    console.log(amount,to);

    const account = await Account.findOne({
        userId: req.userId
    });
   console.log(account);
    if (account.balance < amount) {
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    console.log("3");
    const toAccount = await Account.findOne({
        userId: to
    });
  console.log(toAccount);
    if (!toAccount) {
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })

    res.status(200).json({
        message: "Transfer successful"
    })


}

module.exports={getBalance,transferBalance};
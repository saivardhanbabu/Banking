const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressAsynHandler=require('express-async-handler')
const expressAsyncHandler = require('express-async-handler')
let usersCollection;
let usersBalance;
let usersTransfer
userApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    usersBalance=req.app.get('usersBalance')
    usersTransfer=req.app.get('usersTransfer')
    next()
})

userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    const usersCollectionObj = req.app.get("usersCollection");

  const user = req.body;


    let dbuser = await usersCollectionObj.findOne({ username: user.username});
    let dbuser1=await usersCollectionObj.findOne({accountNo:user.accountNo})
    if (dbuser !== null || dbuser1!==null) {
     return res.send({ message: "User already existed" });
    }

    const hashedPassword=await bcryptjs.hash(user.password,7)
    user.password=hashedPassword;

        await usersCollectionObj.insertOne(user)
        res.send({message:"User created"})
}))
userApp.post('/verify',expressAsynHandler(async(req,res)=>{
    const usersBalanceObj = req.app.get("usersBalance");
  let userCred=req.body
    let dbuser=await usersBalanceObj.findOne({username:userCred.usernameTo,accountNo:userCred.accountNo})
    console.log(dbuser)
    if(dbuser===null){
        return res.send({message:"Amount Not Added"})
    }
    else{
        return res.send({message:"Verified"})
    }
}))
userApp.post('/verify/transfer',expressAsynHandler(async(req,res)=>{
    const usersBalanceObj = req.app.get("usersBalance");
  let userCred=req.body
    let dbuser=await usersBalanceObj.findOne({username:userCred.usernameTo,accountNo:userCred.accountTo})
    if(dbuser===null){
        return res.send({message:"Amount Not Transferred Please Check the Details Entered"})
    }
    else{
        return res.send({message:"Verified"})
    }
}))
userApp.post('/login',expressAsynHandler(async(req,res)=>{
    const usersCollectionObj = req.app.get("usersCollection");
  const userCred = req.body;
    let dbuser=await usersCollectionObj.findOne({username:userCred.username,accountNo:userCred.accountNo})
    if(dbuser===null ){
        return res.send({message:"Invalid username/account no"})
    }else{
        let status=await bcryptjs.compare(userCred.password,dbuser.password)
        console.log(status)
        if(status===false){
            return res.send({message:"Invalid password"})
        }
        else{
            //create token
           const signedToken= jwt.sign({username:dbuser.username},`${process.env.SECRET_KEY}`,{expiresIn:"1h"})
           delete dbuser.password;
           res.send({message:"login success",token:signedToken,user:dbuser})
        }
    }
}))
userApp.post('/user-add-balance',expressAsynHandler(async(req,res)=>{
    const amt=req.body
    const usersBalanceObj = req.app.get("usersBalance");
    let res2=await usersBalanceObj.updateOne({username:amt.usernameTo,accountNo:amt.accountNo},{$inc:{balance:+amt.amount}})
    res.send({message:"Amount Added",payload:res2})
}))
userApp.post('/update-add-balance',expressAsynHandler(async(req,res)=>{
    const amt=req.body
    const usersTransferObj=req.app.get("usersTransfer")
    let res4=await usersTransferObj.insertOne(amt)
    res.send({message:"Amount Updated"})
}))
userApp.post('/user-add-balance/first',expressAsynHandler(async(req,res)=>{
    const amt=req.body
    const usersBalanceObj = req.app.get("usersBalance");
    let res2=await usersBalanceObj.insertOne(amt)
    res.send({message:"Added"})
}))
userApp.get('/user-balance/:username/:accountNo',expressAsynHandler(async(req,res)=>{
    const amt=req.body
    const user=(req.params.username)
    const acc=req.params.accountNo
    const usersBalanceObj = req.app.get("usersBalance");
    let result = await usersBalanceObj.find({username:user,accountNo:acc}).toArray()
    console.log(result)
    res.send({message:"Amount",payload:result})
}))
userApp.post('/transfer',expressAsynHandler(async(req,res)=>{
    const transferObj=req.body
    const usersTransferObj=req.app.get("usersTransfer")
    const usersBalanceObj = req.app.get("usersBalance");
    
    const user = await usersBalanceObj.findOne({accountNo: transferObj.accountFrom});

    if (+user.balance >= +transferObj.amount) {
        await usersBalanceObj.updateOne({accountNo:transferObj.accountFrom},{$inc:{balance:-transferObj.amount/2}})
        await usersBalanceObj.updateOne({accountNo:transferObj.accountTo},{$inc:{balance:+transferObj.amount/2}})
        res.send({message:"transfer success"})
    } else {
        res.send({message: "Insufficient funds"})
    }

}))
userApp.post('/transfer/update',expressAsyncHandler(async(req,res)=>{
    const obj=req.body
    const usersTransferObj=req.app.get("usersTransfer")
    await usersTransferObj.insertOne(obj)
    res.send({message:"Updated"})
}))
userApp.get('/transfer/:username',expressAsynHandler(async(req,res)=>{
    const user=req.params.username
    const usersTransferObj = req.app.get("usersTransfer");
    let res1 = await usersTransferObj.find({usernameFrom:user}).toArray()
    res.send({message:"Transfer Fetch",payload:res1})
    }
    ))
userApp.get('/transfer/:username/get',expressAsynHandler(async(req,res)=>{
    const user=req.params.username
    const usersTransferObj = req.app.get("usersTransfer");
    let res2 = await usersTransferObj.find({usernameTo:user}).toArray()
    res.send({message:"Transfer Fetch",payload:res2})
    }
))
module.exports=userApp;
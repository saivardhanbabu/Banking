//create mini-express app
const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
// const {createUserOrAuthor,userOrAuthorLogin}=require('./Util')
const expressAsynHandler=require('express-async-handler')
const expressAsyncHandler = require('express-async-handler')
// const verifyToken=require('../Middlewares/verifyToken')
let usersCollection;
let usersBalance;
let usersTransfer
userApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    usersBalance=req.app.get('usersBalance')
    usersTransfer=req.app.get('usersTransfer')
    next()
})

//define routes
//user creation
// userApp.post('/user',expressAsynHandler(createUserOrAuthor))
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    const usersCollectionObj = req.app.get("usersCollection");

  //get user or autrhor
  const user = req.body;

  //check duplicate user
    //find user by usersname
    let dbuser = await usersCollectionObj.findOne({ username: user.username});
    let dbuser1=await usersCollectionObj.findOne({accountNo:user.accountNo})
    //if user existed
    if (dbuser !== null || dbuser1!==null) {
     return res.send({ message: "User already existed" });
    }

  //hash password
    const hashedPassword=await bcryptjs.hash(user.password,7)
    //replace plain pw with hashed pw
    user.password=hashedPassword;

    //save user
        await usersCollectionObj.insertOne(user)
        res.send({message:"User created"})
}))
userApp.post('/verify',expressAsynHandler(async(req,res)=>{
    const usersBalanceObj = req.app.get("usersBalance");
  //get user or autrhor
  let userCred=req.body
  //const userCred = req.body;
  //verifuy username of user
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
  //const userCred = req.body;
  //verifuy username of user
    let dbuser=await usersBalanceObj.findOne({username:userCred.usernameTo,accountNo:userCred.accountTo})
    console.log(dbuser)
    if(dbuser===null){
        return res.send({message:"Amount Not Transferred"})
    }
    else{
        return res.send({message:"Verified"})
    }
}))
//user login
userApp.post('/login',expressAsynHandler(async(req,res)=>{
    const usersCollectionObj = req.app.get("usersCollection");
  //get user or autrhor
  const userCred = req.body;
  //verifuy username of user
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
// userApp.put('/user-add-balance',expressAsynHandler(async(req,res)=>{
//     const amt=req.body
//     const usersBalanceObj = req.app.get("usersBalance");
//     await usersBalanceObj.updateOne({acc:1},{$set:{amount:amt.amount}})
//     res.send({message:"Amount Added",payload:amt})
// }))
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
// userApp.get('/user-balance/:username/:accountNo/get',expressAsynHandler(async(req,res)=>{
//     const amt=req.body
//     const user=(req.params.username)
//     const acc=req.params.accountNo
//     const usersBalanceObj = req.app.get("usersBalance");
//     let result = await usersBalanceObj.find({username:user,accountNo:acc}).toArray()
//     console.log(result)
//     res.send({message:"Amount",payload:result.balance})
// }))
userApp.get('/user-balance/:username/:accountNo',expressAsynHandler(async(req,res)=>{
    const amt=req.body
    const user=(req.params.username)
    const acc=req.params.accountNo
    const usersBalanceObj = req.app.get("usersBalance");
    let result = await usersBalanceObj.find({username:user,accountNo:acc}).toArray()
    console.log(result)
    res.send({message:"Amount",payload:result})
}))
// userApp.post('/transfer',expressAsynHandler(async(req,res)=>{
//     const transferObj=req.body
//     const usersTransferObj = req.app.get("usersTransfer");
//     await usersTransferObj.insertOne(transferObj)
//     res.send({message:"transfer success"})
// }))
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
// read articles of all authors
// userApp.get('/articles',verifyToken,expressAsynHandler(async(req,res)=>{
//     //get all articles of all authors
//     const articlesList=await articlesCollection.find({status:true}).toArray()
//     res.send({message:"All articles",payload:articlesList})

// }))


// //write comment for an article by its artioclesID
// userApp.post('/comment/:articleId',expressAsynHandler(async(req,res)=>{

//         //get articleId from url
//        const articleIdFromURL=(+req.params.articleId);
//         //get comment obj from req
//         const userComment=req.body;
//         console.log(userComment)
//         //add usercomment obj as an element to comments array of article document
//         await articlesCollection.updateOne({articleId:articleIdFromURL},{$addToSet:{comments:userComment}})
//         //send res
//         res.send({message:"User comment added"})

// }))

//export userApp
module.exports=userApp;
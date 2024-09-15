const express = require('express');
const User = require('../model/User');
const Token = require('../model/Token');
const router = express.Router();
const {Login,Register,Logout,UpdateUsername} = require('../controller/Auth');

router.post('/login',Login);
router.post('/logout',Logout);
router.post('/register',Register);
router.post('/updateusername',UpdateUsername);
router.get("/user/verify/:id/:token",async(req,res)=>{
    const {id}=req.params;
    let user= await User.findOne({_id:id});
    if(!user) return res.status(400).send("Invalid link");

    let token=await Token.findOne({userId:id,token:req.params.token});
    if(!token) return res.status(400).send("Invalid link");
    // await User.updateOne({_id:user.id,verify:true});
    user.is_verify=true;
    await user.save();
    await Token.findByIdAndDelete(token._id);
    res.status(200).json({message: "Email verified successfully"});
})

module.exports = router;
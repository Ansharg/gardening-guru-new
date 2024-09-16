const User = require('../model/User');
const Token = require('../model/Token');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const crypto = require("crypto");
const SendEmail = require("../utils/util");

module.exports.Login = async (req,res) => {
    try {
        if (req.session.user) {
            return res.status(400).json({message: "User already logged in"});
        }
        const {email,password} = req.body;
        if(!email){
            return res.status(400).json({message: "Please enter your email"});
        }
        if(!password){
            return res.status(400).json({message: "Please enter your password"});
        }
        const user = await User.findOne({UserEmail: email});
        if(!user){
            return res.status(400).json({message: "User not found"})
        }
        bcrypt.compare(password, user.Password, (err, result) => {
            if (result && user.is_verify) {
                req.session.user = user;
                req.session.isLoggedIn = true;
                return res.status(200).json({message: "User login successful",data: user});
            }
            else{
                return res.status(401).json({message: "Password invalid"})
            }
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports.Register = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        if(!name || !email){
            return res.status(400).json({
                message: "User not entered username or email"
            });
        }
        if(!password){
            return res.status(400).json({
                message: "User not entered password"
            });
        }
        const user = await User.findOne({ email: email})
        if(user){
            return res.status(400).json({message: "User exists already"})
        }
        bcrypt.hash(password, saltRounds,async(err, hash)=>{
            const user = await User.create({
                UserName: name,
                UserEmail: email,
                Password: hash,
            });
            const token = await Token.create({userId: user.id, token: crypto.randomBytes(32).toString("hex")})
            await SendEmail.SendEmail(user.UserEmail, "Welcome to Gardening Guru! Verify Your Account", user.id, token.token);
        });
        res.status(200).json({message : " User registered successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports.Logout = (req, res) => {
    req.session.isLoggedIn = false;
    res.status(200).json({message : " User logout successfully"})
}

module.exports.UpdateUsername = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.id,{UserName: req.body.name});
        res.status(200).json({message: "Username updated successfully"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Something went wrong"});
    }
}

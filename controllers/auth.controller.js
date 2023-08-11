const bcrypt  = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const constant = require('../util /constant')



const signUp = async(req,res) => {
    try{
        const obj = {
            name : req.body.name,
            password : bcrypt.hashSync(req.body.password,8), 
            email : req.body.email,
            registerWith : constant.registerWith.Email
        }
        const user = await User.create(obj);
        return res.status(201).send(user)
    }catch(err){
        console.log(err);
        res.status(500).send({
            message : err
        })
    }
}

const signIn = async(req,res) => {
    try{
        const user = await User.findOne({email : req.body.email});
        console.log(user);
        if(!user){
           return res.status(400).send({
                message : 'user not found'
            })
        }
        const isPasswordValid = bcrypt.compareSync(req.body.password,user.password);
        if(!isPasswordValid){
            return res.status(401).send({
                message : 'Password is wrong'
            })
        }
        const token = jwt.sign({id:user._id},authConfig.secretKey,{
            expiresIn : 600000
        });
        return res.status(201).send({
            message : "User loggedIn",
            acessToken : token
        })
        
    }catch(err){
        return res.status(500).send({
            message : err
        })
    }
}

module.exports = {
    signIn,
    signUp
}
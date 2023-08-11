const bcrypt  = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');




const bodyCheck = async(req,res,next) => {
   console.log(req.body)
    if(!req.body.email){
        return res.status(401).send({
        message : 'Email not provided'
    })
}
    if(!isValidEmail(req.body.email)){
        return res.status(401).send({
            messsage : 'Email format Incorrect'
        })
    }

    if(!req.body.password){
    return res.status(401).send({
        message : 'password not provided'
    })
}
    if(!isValidPassword(req.body.password))
    {
        return res.status(400).send({
            message : 'Password Format is Incorrect'
        })
    }

    next();
}

const emailCheck = (req,res,next) => {
    if(!req.body.email){
        return res.status(401).send({
        message : 'Email not provided'
    })
}
    if(!isValidEmail(req.body.email)){
        return res.status(401).send({
            messsage : 'Email format Incorrect'
        })
    }
    next();
}

const userCheckEmail = async (req,res,next) => {
    try{
         const user = await User.findOne({email : req.body.email});
         if(!user){
            return res.status(404).send({
                message : 'User not present'
            })
         }
         next();
    }catch(err){
        return res.status(500).send({
            message : 'Error inside userCheckEmail'
        })
    }
}


const isValidEmail = (email)=>{ // checks valid email format
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const isValidPassword = (password)=>{ // checks password meets requirements
    return password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,25}$/);
}

module.exports = {
    bodyCheck,
    emailCheck,
    userCheckEmail
}


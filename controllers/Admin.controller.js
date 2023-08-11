const User  = require('../models/user.model');
const constant = require('../util /constant')
const bcrypt = require('bcryptjs');
const objectConverter = require('../util /objectConverter');




const createAdmin = async(req,res) => {
    
    try {
        let user = await User.findOne({userTypes : constant.userTypes.admin})
       
        if(user){
            console.log('Admin Already Created',user);
            
            return res.status(201).send({
                message : 'Admin already created'
            }) ;
        }
       
           
         let obj =   {
            email : req.body.email ? req.body.email : undefined,
            password : req.body.password ? bcrypt.hashSync(req.body.password):undefined,
            userName : 'Admin',
            userTypes : constant.userTypes.admin

           }
           if(req.file){
            const {filename,path} = req.file;
                  obj["image"] = {
                         fileName : filename,
                         fileAddress :path
                  }
           }

         console.log(obj);
          await User.create(obj);
         res.status(201).send({
            message : 'Admin Got Created'
         })
        console.log('Admin got created');
        


     }catch(err){
        console.log(err);
          res.status(500).send({
            message : 'Internal Error while creating Admin'
          })
     }
}
const getList = async(req,res) => {
    try{
        let obj = {
            userTypes : constant.userTypes.customer
        };
        
    
        const users = await User.find(obj);
        console.log('users',users)
        res.status(200).send(objectConverter.userList(users));

    }catch(err){
        console.log(err);
        return res.status(500).send({
            message : 'Error inside User get Controller'
        })
    }
}


const update = async(req,res) => {
    try{
        let adminId = req.userId;
        let obj = {
            userName : req.body.userName ? req.body.userName : undefined,
            email : req.body.email ? req.body.email : undefined,
            password : req.body.password ? bcrypt.hashSync(req.body.password):undefined,
            
        }
        if(req.file){
            const {filename , path} = req.file
          obj.image = {
                fileName : filename,
                fileAddress : path,
            }
        }

      await User.findOneAndUpdate({_id:adminId},{$set:obj});
      return  res.status(201).send({
        message : 'Admin got updated'
       })

    }catch(err){
         console.log('Error inside update admin',err);
         res.status(500).send({
            message : "Internal Server Error"
         })
    }
}

module.exports = {
    createAdmin,
    getList,
    update
}
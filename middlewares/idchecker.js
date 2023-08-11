const mongoose = require('mongoose')

const idCheck = async(req,res,next)=>{
    try{
        if(!req.params.id) 
        {
             return res.status(401).send({
                message : 'id not present'
             })
        }
       let check = mongoose.isValidObjectId(req.params.id);
      
       if(!check){
       return  res.status(400).send({
            message : 'Not a valid Param id'
        })
       }

        
         next()
    }catch(err){
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

module.exports = {
    idCheck
}
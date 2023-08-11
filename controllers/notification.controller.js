
const Notification = require('../models/notification.model');
const constant = require('../util /notification.constant');
const User = require('../models/user.model');
const userConst = require('../util /constant')
const createNotification = async(req,res) => {
  console.log(req.body);
    try{
      let obj = {
        sendTo : req.body.sendTo,
        Type : req.body.Type,
        Title : req.body.Title,
        message : req.body.message,
       };
      if(req.body.sendTo[0] == constant.sendTo.toAll)
      {
      const user = await User.find({userTypes : userConst.userTypes.customer});
      console.log('user',user);
      for(let i=0;i<req.body.Type.length;i++)
      {
        if(req.body.Type[i]== constant.notificationType.email){
               let userEmail = [];

               for(let i=0;i<user.length;i++) userEmail.push(user[i].email);

               constant.emailSender(userEmail,req.body);
               
               

               const notification = await Notification.create(obj);

               for(let i=0;i<user.length;i++){
                notification.recipients.push(user[i]._id);
               }

               notification.save();

               return res.status(201).send({
                message : 'Email sent'
               })

        }
        else if(req.body.Type[i] == constant.notificationType.push){
             
          
               const notification = await Notification.create(obj);
               for(let i=0;i<user.length;i++){
                notification.recipients.push(user[i]._id);
               }
               notification.save();
               return res.status(201).send({
                message : 'push sent to All'
               })

        }

      }
    } else if(req.body.sendTo == constant.sendTo.specific)
    {
            let email_Arr = [];
            let userId_Arr = [];
            for(let i=0;i<req.body.user.length;i++)
            {
              const user = await User.findOne({userName :req.body.user[i]});
              email_Arr.push(user.email);
              userId_Arr.push(user._id);
            }
            console.log(email_Arr);
            console.log(userId_Arr)
        for(let i=0;i<req.body.Type.length;i++){
          if(req.body.Type[i] == constant.notificationType.email)
          {

            constant.emailSender(email_Arr,req.body);


             const notification = await Notification.create(obj);

             for(let i=0;i<userId_Arr.length;i++){
              notification.recipients.push(userId_Arr[i]);
             }
             notification.save();
             return res.status(201).send({
              message : 'specific Email sent'
             })
          }
          else if(req.body.Type[i] == constant.notificationType.push)
          {
           

             const notification = await Notification.create(obj);

             for(let i=0;i<userId_Arr.length;i++){
              notification.recipients.push(userId_Arr[i]);
             }
             notification.save();
             return res.status(201).send({
              message : 'specific push sent'
             })
          }
        }
            
           

    }


    }catch(err){
        console.log('Error inside createNotification controller',err);
        return res.status(501).send({
            message : 'Internal Server Error'
        })
    }
}


const getNotification = async(req,res) => {
  try{


  }catch(err) {
        console.log('Error inside getNotification Controller',err);
        return res.status(500).send({
          message : 'Internal Server Error'
        })
  }
}


module.exports = {
    createNotification
}
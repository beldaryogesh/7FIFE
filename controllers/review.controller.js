const User = require('../models/user.model');
const Review = require('../models/Review.model');
const constant = require('../util /review.constant')

const createReview = async(req,res)=> {
    try{
        const user = await User.findById(req.userId);
        let obj = {
            userName : user.userName,
            review : req.body.review ? req.body.review : undefined,
        }
        await Review.create(obj);
        return res.status(200).send({
            message :'Review got Created'
        })

    }catch(err){
        console.log('Error inside createReview Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const getReview = async(req,res) => {
    try{
        
        let obj = {};
        if(req.query['userName']){
            obj['userName'] = req.query['userName']
        }
        
        const reviews = await Review.find(obj);
        return res.status(200).send(constant.objectConverter(reviews));

    }catch(err){
        console.log('Error inside getReview controller',err);
        return res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

const updateReview = async(req,res) => {
    try{
        const review = await Review.findById(req.params.id);
        
        let obj = {
            reply : req.body.reply ? req.body.reply : undefined,
            status : req.body.status? req.body.status :undefined
        }
        await review.updateOne(obj);
        await review.save();
        return res.status(201).send({
            message : 'Review got updated'
        })

    }catch(err){
        console.log('Error inside updateReview Controller',err);
        res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const deletereview = async(req,res) => {
    try{
        let id = req.params.id;
        await Review.deleteOne({_id :id});
       return  res.status(201).send({
            message : 'review got deleted'
        })

    }catch(err){
        console.log('Error Occured inside deletereview of Review Controller',err);
         return res.status(500).send({
            message : 'Internal Server Error'
         })
    }
}

module.exports = {
    createReview,
    getReview,
    updateReview,
    deletereview
   
}
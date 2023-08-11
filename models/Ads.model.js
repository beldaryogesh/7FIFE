const mongoose = require('mongoose');
const constant = require('../util /ads.constant');

const adsSchema =  new mongoose.Schema({
    adsTitle : {
        type : String,
        required : true
    },
    redirectLink : {
        type : String,
        required : true
    },
    advertiseAs : {
        type : String,
        enum : [constant.adsType.image,constant.adsType.video],
        required : true
    }, 
    advertiseImage : {
        fileName :{
            type : String
        },
        fileAddress : {
            type : String
        }
    },
    advertiseVideo : {
        fileName :{
            type : String
        },
        fileAddress : {
            type : String
        }
    },
    adsTime :{
        type : Number,
        default : 10
    },
    status : {
        type : String,
        enum : [constant.status.active,constant.status.deactive],
        default : constant.status.active,
    }
},{timestamps:true})

module.exports = mongoose.model('Ads',adsSchema);
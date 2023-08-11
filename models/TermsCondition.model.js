const mongoose = require('mongoose');

const termConditionSchema = new mongoose.Schema({
    termsandCondition : {
        type : String,
        trim : true
    }
},{timestamps:true}) 

module.exports = mongoose.model('TermsCondition', termConditionSchema);
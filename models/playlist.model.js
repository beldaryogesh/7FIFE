const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    songs : {
        type : [mongoose.Schema.Types.ObjectId]
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId
    }
})


module.exports = mongoose.model('PlayList',playlistSchema);
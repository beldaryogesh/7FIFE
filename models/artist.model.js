const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  bio: {
    type : String,
  },
  genre: {
    type : [String]
  },
  albums: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Album'
  },
  songs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Song'  
  },
  image : {
    fileName : {
      type : String
    },
    fileAddress : {
      type : String
    }
  },
  followers : {
    type : [mongoose.Schema.Types.ObjectId]
  }

},{timestamps:true});

module.exports = mongoose.model('Artist', artistSchema);


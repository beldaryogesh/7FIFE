const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },

  genre: {
    type : [String]
  },
 
  coverArtImage: {
    fileName : String,
    fileAddress : String
  },
  songs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Song'
  }
},{timestamps:true});


module.exports = mongoose.model('Album', albumSchema);



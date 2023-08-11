var mongoose = require('mongoose');


const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
      },
      artist: {
        type: String,
        required: true
      },
      album: {
        type : mongoose.Schema.Types.ObjectId,
      },
      genre: {
        type: [String],
        required: true
      },
      duration: {
        type: String,
        required: true
      },
      views: {
        type: Number,
        default: 0
      },
      likes: {
        type: Number,
        default: 0
      },
      coverArtImage : {
        fileName : String,
        fileAddress : String,
      },
      lyrics : {
        type : String,
      },
      lyricsTimeStamp : {
        type : Object
      }
  
},{timestamps:true})


songSchema.pre('deleteOne',async function(next){
 
  const songId = this.getFilter()['_id'];
  const Album = require('../models/album.model');
  const Artist = require('../models/artist.model');
  const Playlist = require('../models/playlist.model');
  const User = require('../models/user.model');

  const album = await Album.find({
    songs: songId
  });
  const artist = await Artist.find({
    songs:songId
  });
  const playlist = await Playlist.find({
    songs : songId
  });
  const user = await User.find({
    favrioteSongs : songId
  })
  const albumPromises = album.map(album => {
     album.songs.pull(songId);
     return album.save();
  });
  const artistPromises = artist.map(artist => {
    artist.songs.pull(songId);
    return artist.save();
  });
  const playlistPromises = playlist.map(playlist => {
    playlist.songs.pull(songId);
    return playlist.save();
  })
  const favrioteSongPromises = user.map(user => {
    user.favrioteSongs.pull(songId);
    return user.save();
  })
  const mostPlayedSongPromises = user.map(user => {
   delete user.mostPlayedSongs.songId
    return user.save();
  })

  

  await Promise.all(albumPromises);
  await Promise.all(artistPromises);
  await Promise.all(playlistPromises);
  await Promise.all(favrioteSongPromises);
  await Promise.all(mostPlayedSongPromises);
  next();
     
})



module.exports = mongoose.model('Song',songSchema);
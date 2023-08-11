const Song = require('../models/song.model');
const Playlist = require('../models/playlist.model');
const Album = require('../models/album.model')

const createSong = async(req,res) => {
    try{
        let obj = {
            title : req.body.title ? req.body.title : undefined,
            artist : req.body.artist ? req.body.artist : undefined,
            album : req.body.album ? req.body.album : undefined,
            genre  : req.body.genre ? req.body.genre : undefined,
            duration : req.body.duration ? req.body.duration : undefined,
            views : req.body.views ? req.body.views : undefined,
            likes : req.body.likes ? req.body.likes : undefined,
}

if(req.files.length>0){
    obj["coverArtImage"] = {
        fileName : req.files[0].filename,
        fileAddress : req.files[0].path
    }
}
if(req.lyrics){
    obj["lyricsTimeStamp"] = req.lyricsTimeStamp;
}
      const song =   await Song.create(obj);
        return res.status(201).send({
            message : 'Song got created'
        })

    }catch(err){
        console.log('error inside create song controller',err);
        return res.status(500).send('Internal Server Error');
    }
}

const updateSong = async(req,res) => {
    try{
           const song = await Song.findById(req.params.id);
           let obj = {
            title : req.body.title ? req.body.title : undefined,
            artist : req.body.artist ? req.body.artist : undefined,
            album : req.body.album ? req.body.album : undefined,
            genre  : req.body.genre ? req.body.genre : undefined,
            duration : req.body.duration ? req.body.duration : undefined,
            views : req.body.views ? req.body.views : undefined,
            likes : req.body.likes ? req.body.likes : undefined,
}

        if(req.files.length>0){
            obj["coverArtImage"] = {
                fileName : req.files[0].filename,
                fileAddress : req.files[0].path
            }
        }
           await song.updateOne(obj);
           await song.save();
           return res.status(201).send({
              message : 'Song field updated'
              
           })
    }catch(err){
        console.log('Error inside updateSong controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const getSong = async(req,res) => {
    try{
        let obj = {};
        if(req.params.id){
             obj['_id'] = req.params.id
        }
        const song = await Song.find(obj);
        return res.status(201).send(song)

    }catch(err) {
        console.log('Error inside getSong Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const deleteSong  = async(req,res) => {
    try{
          console.log('deleteOne will run')
          await Song.deleteOne({_id:req.params.id});
          
          console.log('deleteOne will not run')
          return res.status(201).send({
            message : 'Song got deleted'
          })
    }catch(err){
        console.log('Error Inside deleteSong Controller',err);
        return res.status(500).send({
            message : "Internal Server Error"
        })
    }
}


module.exports = {
    createSong,
    updateSong,
    getSong,
    deleteSong
}
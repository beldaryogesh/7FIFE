const Album = require('../models/album.model');
const Artist = require('../models/artist.model');


const createAlbum = async(req,res) =>  {
    try{
        let obj = {
            title : req.body.title ? req.body.title : undefined,
            artist : req.body.artist ? req.body.artist : undefined,
            genre : req.body.genre ? req.body.genre : undefined,
            songs : req.body.songs ? req.body.songs : undefined
        }
       
        if(req.files.length>0){
            obj["coverArtImage"] = {
                fileName : req.files[0].filename,
                fileAddress :req.files[0].path
            }
        }
        const album = await Album.create(obj);
        const artist = await  Artist.findById(req.body.artist);
        artist.albums.push(album._id);
        artist.save();
        
        return res.status(201).send({
            message : "Album got Created"
        })

    }catch(err){
        console.log(
            "Error inside CreateAlbum Controller",err
        )
        return res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

const updateAlbum = async(req,res) => {
    try{
        console.log(req.body);
        let obj = {
            title : req.body.title ? req.body.title : undefined,
            artist : req.body.artist ? req.body.artist : undefined,
            genre : req.body.genre ? req.body.genre : undefined,
        }
        console.log(req);
        if(req.files.length>0){
            obj["coverArtImage"] = {
                fileName : req.files[0].filename,
                fileAddress :req.files[0].path
            }
        }
        const album = await Album.findById(req.params.id);
        await album.updateOne(obj);
        for(let i=0;i<req.body.songs.length;i++){
            album.songs.push(req.body.songs[i]);
        }
        await album.save();
        return res.status(200).send({
            message : 'album got updated'
        })
    }catch(err){
        console.log('Error inside update Album Controller',err);
        return res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

const getAlbum = async(req,res) => {
    try{
          let obj = {};
          if(req.params.id){
            obj["_id"] = req.params.id
          }
          const album = await Album.find(obj);
          return res.status(201).send(album);

    }catch(err){
        console.log('Error inside getAlbum Controller ',err);
        return res.status(500).send({
            message : "Internal Server Error"
        })
    }
}

const deleteAlbum = async(req,res) => {
    try{
       await Album.deleteOne({_id:req.params.id});
       return res.status(200).send({
        message : "Album got deleted"
       })

    }catch(err){
        console.log('Error inside3 delete Album Controller',err);
        return res.status(500).send({
            message : "Internal Server Error"
        })
    }
}


module.exports = {
    createAlbum,
    updateAlbum,
    getAlbum,
    deleteAlbum
}

const PlayList = require('../models/playlist.model');
const User = require('../models/user.model');



const createPlaylist = async(req,res) => {
    try{
        console.log(req.body);
        let obj = {
            name : req.body.name ? req.body.name : undefined ,
            songs : req.body.songs ? req.body.songs : undefined,
            userId : req.userId
        }
        const created_playlist = await PlayList.create(obj);
        const user = await User.findById(req.userId);
        await user.playlist.push(created_playlist._id);
        await user.save();
        return res.status(201).send({
            message : 'Playlist got created'
        })

    }catch(err)
    {
        console.log('Error inside createPlaylist ',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}


const addSong = async(req,res) => {
    try{
        const playlist = await PlayList.findById(req.params.id);

        const obj = {
            name : req.body.name ? req.body.name : undefined,
         }

         playlist.songs.push(req.body.song);
         await playlist.save();
         await playlist.updateOne(obj);
         await playlist.save();
         return res.status(201).send({
            message : 'Songs added to playlist'
         })
        
         

    }catch(err){
        console.log('Error inside update playlist',err);
        return res.status(500).send({
            message : 'Internal server Error'
        })
    }
}

const removeSong = async(req,res) => {
    try{
         let playlist = await PlayList.findById(req.params.id);
         console.log(playlist);
         for(let i=0; playlist.songs.length;i++){
            if(playlist.songs[i]==req.body.song)
            {
                playlist.songs.splice(i,1);
                await playlist.save();
                return res.status(201).send({
                    message : 'Song got removed from playlist'
                })
            } 
         }
    }catch(err){
        console.log('Error inside removeSong Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const getPlaylist = async(req,res) => {
    try{
        let obj = {};
        if(req.params.id){
            obj['_id'] = req.params.id
        }
       const playlist =  await PlayList.find(obj);

       return res.status(200).send(playlist);

    }catch(err){
        console.log('Error inside getPlaylist Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const deletePlaylist = async(req,res) => {
    try{
        let id = req.params.id;
        await PlayList.deleteOne({_id:id});
        const user = await User.findById(req.userId);
        for(let i=0;i<user.playlist.length;i++){
            console.log(user.playlist[i] == req.params.id);
            if(user.playlist[i] == req.params.id) user.playlist.splice(i,1);
        }
        return res.status(201).send({
            message : 'Playlist got deleted'
        })

    }catch(err){
        console.log('Error inside deletePlaylist Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}


module.exports = {
    createPlaylist,
    addSong,
    removeSong,
    getPlaylist,
    deletePlaylist
}
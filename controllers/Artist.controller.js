const Artist = require('../models/artist.model');


const createArtist = async(req,res) => {
    try{
        let obj = {
            name : req.body.name ? req.body.name : undefined,
            bio : req.body.bio ? req.body.bio : undefined ,
            genre : req.body.genre ? req.body.genre : undefined,
            albums : req.body.albums ? req.body.albums : undefined,
            songs : req.body.songs ? req.body.songs : undefined,
        }
        if(req.files.length>0) {
            obj['image'] = {
                fileName : req.files[0].filename,
                fileAddress : req.files[0].path
            }
        }
        await Artist.create(obj);
        return res.status(201).send({
            message : 'Artist Created'
        })
    }catch(err){
        console.log('Error inside createArtist Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const updateArtist = async(req,res) => {
    try{
        const artist = await Artist.findById({_id : req.params.id});
        let obj = {
            name : req.body.name ? req.body.name : undefined,
            bio : req.body.bio ? req.body.bio : undefined ,
            genre : req.body.genre ? req.body.genre : undefined,
            albums : req.body.albums ? req.body.albums : undefined,
        }
        if(req.files.length>0) {
            obj['image'] = {
                fileName : req.files[0].filename,
                fileAddress : req.files[0].path
            }
        }
        await artist.updateOne(obj);
        for(let i=0;i<req.body.songs.length;i++){
            artist.songs.push(req.body.songs[i]);
        }
        await artist.save();
        return res.status(201).send({
            message  : 'Artist got updated'
        })
        

    }catch(err){
        console.log('Error inside updateArtist Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const getArtist = async(req,res) => {
    try{
        let obj = {};
        if(req.params.id){
            obj["_id"] = req.params.id
        }
    const artist = await Artist.find(obj);
    return res.status(201).send(artist);

    }catch(err){
        console.log('Error Inside getArtist Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const deleteArtist = async(req,res) => {
    try{
        await Artist.deleteOne({_id:req.params.id});
        return res.status(201).send({
            message : 'Artist got deleted'
        })

    }catch(err){
        console.log('Error Inside delete Artist Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}

const getArtistFollowers = async(req,res)=> {
   try{
        const artist = await Artist.findById(req.params.id);
        let follower = artist.followers.length;
        return res.status(200).send({
            followers : follower
        })

   }catch(err){
    console.log('Error inside getFollowers',err);
    return res.status(500).send({
    message : 'Internal Server Error'
   })
   }
}


module.exports = {
    createArtist,
    updateArtist,
    getArtist,
    deleteArtist,
    getArtistFollowers
}
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
const bcrypt = require('bcryptjs');
const constant = require('../util /constant');
const Artist = require('../models/artist.model');
const Reward = require('../models/Reward.model');
const Song = require('../models/song.model');

const createGoogle = async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email });
        var flag = 0;

        if (!user) {
            let obj = {
                email: req.body.email,
                registerWith: constant.registerWith.google
            }
            user = await User.create(obj);
            flag = 1

        }
        if (user.registerWith != constant.registerWith.google) {
            return res.status(400).send({
                message: "Can't login Through google"
            });
        }
        let str = flag ? 'User Got Created' : 'User was already Created';

        const token = jwt.sign({ id: user._id }, authConfig.secretKey, {
            expiresIn: 600000
        });
        return res.status(201).send({
            message: str,
            acessToken: token
        })



    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: 'Error in creating user'
        })

    }
}

const update = async (req, res) => {
    try {
        let id = req.params.id;
        let obj = {
            userName: req.body.userName ? req.body.userName : undefined,
            email: req.body.email ? req.body.email : undefined,
            password: req.body.password ? bcrypt.hashSync(req.body.password) : undefined,
        }
        if (req.files.length > 0) {
            obj['image'] = {
                fileName: req.files[0].filename,
                fileAddress: req.files[0].path
            }
        }

        const user = await User.findById(id);
        const admin = await User.findById(req.userId);
        if (req.body.status) {
            if (admin.userTypes == constant.userTypes.admin) {
                obj.status = req.body.status ? req.body.status : undefined;
            }
            else {
                return res.status(401).send({
                    message: 'status can only be updated by admin'
                })
            }

        }


        console.log(`object for updation of user is ${obj}`);

        await user.updateOne(obj)
        await user.save();
        return res.status(201).send({
            message: "User updated Successssssfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Error in update controller '
        })
    }
}

const passUpCreate = async (req, res) => {
    console.log(req.body.email);
    try {
        let email = req.body.email
        function generateRandomNumber() {
            const min = 100000; // Minimum value (inclusive)
            const max = 999999; // Maximum value (inclusive)
            const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

            const uppercaseLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Uppercase letter ASCII range: 65-90
            const lowercaseLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97); // Lowercase letter ASCII range: 97-122
            const specialCharacter = String.fromCharCode(Math.floor(Math.random() * 15) + 33); // Special character ASCII range: 33-47

            const randomString = randomNumber.toString() + uppercaseLetter + lowercaseLetter + specialCharacter;

            // Shuffle the characters in the string
            const shuffledString = randomString.split('').sort(() => 0.5 - Math.random()).join('');

            return shuffledString;
        }

        // Usage example 
        const TempPassword = generateRandomNumber();

        let obj = {
            password: bcrypt.hashSync(TempPassword)
        }
        const user = await User.findOneAndUpdate({ email: email }, { $set: obj });
        user.save();
        return res.status(201).send({
            message: `Temporary Password is ${TempPassword} for this ${email}`
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: 'Error in passUpCreate'
        })
    }
}


const createFacebook = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        var flag = 0;
        if (!user) {
            let obj = {
                email: req.body.email,
                registerWith: constant.registerWith.facebook
            }
            user = await User.create(obj);
            flag = 1

        }
        if (user.registerWith != constant.registerWith.facebook) {
            return res.status(400).send({
                message: "Can't login Through facebook"
            });
        }

        let str = flag ? 'User Got Created' : 'User was already Created';

        const token = jwt.sign({ id: user._id }, authConfig.secretKey, {
            expiresIn: 600000
        });
        return res.status(201).send({
            message: str,
            acessToken: token
        })



    } catch (err) {
        console.log(err);
        return res.status(500).send({
            message: 'Error in creating user'
        })

    }
}

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;

        await User.deleteOne({ _id: id });
        return res.status(201).send({
            message: 'User Deleted succefully'
        })


    }
    catch (err) {
        console.log('Error inside delete User controller', err);
        return res.status(500).send({

            message: 'internal server error'
        })
    }
}

const getUserPlaylist = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('playlist');
        console.log(user);
        return res.status(201).send(constant.arrayConverterName(user.playlist));
    } catch (err) {
        console.log('Error inside getUserPlaylist Controller', err);
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

const favrioteSong = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('favrioteSongs');
        console.log(user);
        for (let i = 0; i < user.favrioteSongs.length; i++) {
            if (user.favrioteSongs[i]._id == req.params.id) {
                await user.updateOne({
                    $pull: {
                        favrioteSongs: req.params.id
                    }
                });
                await user.save();
                return res.status(201).send({
                    message: 'Song got removed from favrioteSong'
                })
            }
        }
        user.favrioteSongs.push(req.params.id);
        await user.save();

        return res.status(201).send({
            message: 'Song got added to favrioteSong'
        })

    } catch (err) {
        console.log('Error inside favrioteSong Controller', err);
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}


const getfavrioteSongs = async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate('favrioteSongs');
        return res.status(200).send(user.favrioteSongs);

    } catch (err) {
        console.log('Error inside getFavrioteSong Controller', err);
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}




const PlayedSong = async (req, res) => {
    try {
        
        let key = req.params.id;
        let userId = req.userId;
        const user = await User.findById(userId);
        
        
        if (user.mostPlayedSongs[key]) {
           const updatedObj = {$set : {['mostPlayedSongs.'+key]:(++user.mostPlayedSongs[key])}}
           await User.findByIdAndUpdate(userId,updatedObj);
           
        }
        
        else {
            const updatedObj = {$set:{['mostPlayedSongs.'+key]:1 }}
            console.log('not hello')
           await User.findByIdAndUpdate(userId,updatedObj)
        }
       
        return res.status(201).send({
            message: 'Song is Played '
        })

    } catch (err) {
        console.log('Error inside playedSong', err);
        return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

const getmostPlayedSong = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        console.log(user.mostPlayedSongs);

         // Convert the object to an array of key-value pairs
        const objEntries = Object.entries(user.mostPlayedSongs);

        // Sort the Array 
        objEntries.sort((a, b) => b[1] - a[1]);

        // Convert the sorted array back to an object
        const sortedObj = Object.fromEntries(objEntries);
        
        return res.status(201).send(sortedObj);

    } catch (err) {

            
            console.log('Error inside mostPlayedSong', err);
            return res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}

const followingArtist = async(req,res) => {
    try{
        const artistId = req.params.id;
        const userId = req.userId;
        const user  = await User.findById(userId);
        const artist = await Artist.findById(artistId);
     for(let i=0;i<user.following.length;i++){
        if(user.following[i]==artistId) {
            user.following.pull(artistId);
            await user.save();
            artist.followers.pull(userId);
            await artist.save();
            return res.status(201).send({
                message : `You Unfollowed ${artist.name}`
            })
        }
     } 
      user.following.push(artistId);
      await user.save();
      artist.followers.push(userId);
      await artist.save();
      return res.status(200).send({
        message : `you followed ${artist.name}`
      })
        
    }catch(err){
        console.log('Error inside following Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}


// Function to calculate word alignment accuracy using Levenshtein distance


// Function to calculate timing accuracy


// Function to evaluate word alignment accuracy and timing accuracy
const  evaluateAccuracy= async(req, res) => {
  try{
  const song = await Song.findById(req.params.id);
  const recognizedLyrics = req.recognizedLyrics;
  const originalLyrics = song.lyricsTimeStamp;
  const wordAlignmentAccuracy = constant.calculateWordAlignmentAccuracy(recognizedLyrics, originalLyrics);
  const timingAccuracy = constant.calculateTimingAccuracy(recognizedLyrics, originalLyrics);
  const totalAccuracy = (wordAlignmentAccuracy.toFixed(2) + timingAccuracy.toFixed(2))/2;
  console.log(totalAccuracy);
  var reward ;
  switch(totalAccuracy){
    case(totalAccuracy>90) : 
      reward = 'A+';
      break ;
    case(totalAccuracy>80) : 
       reward = 'A'
       break;
    case(totalAccuracy>70) :
       reward = 'B+'
       break;
    case(totalAccuracy>60) : 
       reward = 'B'
       break;
    case(totalAccuracy>50) : 
        reward = 'C+'
        break;
    case(totalAccuracy>40) : 
        reward = 'C'
        break ;
    case(totalAccuracy<40) : 
        reward = 'F'
        break;                       

  }
  
    const reward_score = await Reward.find({score : reward});
    const user = await User.findById(req.userId);
    user.score += reward_score.reward;
    await user.save();
    console.log(user);
    return res.status(201).send({
        Score : reward
    })

}catch(err){
    console.log('Error inside EvaluateAccuracy Controller',err);
    return res.status(500).send({
        message : 'Internal Server Error'
    })
  }
}

const ranking = async(req,res) => {
    try{
       const ranking = await User.find({}).sort({score : -1}).limit(5);
       return res.status(201).send(ranking);

    }catch(err){
        console.log('Error inside Ranking Controller',err);
        return res.status(500).send({
            message : 'Internal Server Error'
        })
    }
}














module.exports = {
    createGoogle,
    createFacebook,
    update,
    passUpCreate,
    getUserPlaylist,
    favrioteSong,
    deleteUser,
    PlayedSong,
    getmostPlayedSong,
    getfavrioteSongs,
    followingArtist,
    evaluateAccuracy,
    ranking
}
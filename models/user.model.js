const mongoose = require("mongoose");
const constant = require('../util /constant');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        unique: true,
        default: function () {
            let username = 'guest' + Math.floor(Math.random() * 10000);
            return username;
        }
    },
    image: {

        fileName: {
            type: String,
        },
        fileAddress: {
            type: String,
        }

    },

    email: {
        type: String,
        required: true,
        lowercase: true, // it will covert the email into the lower case and then store in the db,
        minLength: 10,  // anything less than 10 will fail
        unique: true

    },
    password: {
        type: String,
    },
    userTypes: {
        type: String,
        enum: [constant.userTypes.admin, constant.userTypes.customer],
        default: constant.userTypes.customer

    },
    status: {
        type: String,
        enum: [constant.status.Active, constant.status.Deactive],
        default: constant.status.Active
    },
    registerWith: {
        type: String,
        enum: [constant.registerWith.Email, constant.registerWith.google, constant.registerWith.facebook],
        default: constant.registerWith.Email
    },
    playlist: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'PlayList'
    },
    favrioteSongs: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Song',
    },
    mostPlayedSongs: {
        type: Object,
        ref: 'Song',
        default: {}
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Artist'
    },
    score: {
        type: Number,
        default: 0
    },

    createdAt: {
        // I want to default to a new date
        type: Date,
        immutable: true,  // This will ensure the createdAt column is never updated but once in the start
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    }


})


userSchema.pre('deleteOne', async function (next) {
    const userId = this.getFilter()['_id'];
    const Artist = require('../models/artist.model');

    const artist = await Artist.find({
        followers: userId
    })

    const artistPromises = artist.map(artist => {
        artist.followers.pull(userId);
        return artist.save();
    })

    await Promise.all(artistPromises);

})

module.exports = mongoose.model("User", userSchema);
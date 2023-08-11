const artistController = require('../controllers/Artist.controller');
const authJwt = require('../middlewares/authjwt')
const admin = require('../middlewares/Admin');

module.exports = (app) => {
    app.post('/createartist',[authJwt.verifyToken,admin.isAdmin],artistController.createArtist);
    app.put('/updateartist/:id',[authJwt.verifyToken,admin.isAdmin],artistController.updateArtist);
    app.get('/getArtist',[authJwt.verifyToken,admin.isAdmin],artistController.getArtist);
    app.get('/getartist/:id',[authJwt.verifyToken,admin.isAdmin],artistController.getArtist);
    app.delete('/deleteartist/:id',[authJwt.verifyToken,admin.isAdmin],artistController.deleteArtist);
    app.get('/getfollower/:id',[authJwt.verifyToken,admin.isAdmin],artistController.getArtistFollowers)
}
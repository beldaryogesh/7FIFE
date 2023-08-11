const playlistController = require('../controllers/playlist.controller');
const authJwt = require('../middlewares/authjwt');
const playlist = require('../middlewares/playlist');


module.exports = (app) => {
    app.post('/createplaylist',[authJwt.verifyToken],playlistController.createPlaylist);
    app.put('/addsongs/:id',[authJwt.verifyToken,playlist.repeatedSongs],playlistController.addSong);
    app.put('/removesongs/:id',[authJwt.verifyToken],playlistController.removeSong);
    app.get('/getplaylist/:id',[authJwt.verifyToken],playlistController.getPlaylist);
    app.get('/getplaylist',[authJwt.verifyToken],playlistController.getPlaylist);
    app.delete('/deleteplaylist/:id',[authJwt.verifyToken],playlistController.deletePlaylist)
}
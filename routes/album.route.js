const albumController = require('../controllers/album.controller');
const authJwt = require('../middlewares/authjwt');
const admin = require('../middlewares/Admin')


module.exports = (app) => {
    app.post('/createalbum',[authJwt.verifyToken,admin.isAdmin],albumController.createAlbum);
    app.put('/updatealbum/:id',[authJwt.verifyToken,admin.isAdmin],albumController.updateAlbum);
    app.get('/getalbum',[authJwt.verifyToken,admin.isAdmin],albumController.getAlbum);
    app.get('/getalbum/:id',[authJwt.verifyToken,admin.isAdmin],albumController.getAlbum);
    app.delete('/albumdelete/:id',[authJwt.verifyToken,admin.isAdmin],albumController.deleteAlbum)
}
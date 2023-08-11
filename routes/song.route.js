const songController = require('../controllers/song.controller');
const authJwt = require('../middlewares/authjwt');
const admin = require('../middlewares/Admin');


module.exports = (app) => {
    app.post('/createsong',[authJwt.verifyToken,admin.isAdmin],songController.createSong);
    app.put('/updatesong/:id',[authJwt.verifyToken,admin.isAdmin],songController.updateSong);
    app.get('/getsong',[authJwt.verifyToken,admin.isAdmin],songController.getSong);
    app.get('/getsong/:id',[authJwt.verifyToken,admin.isAdmin],songController.getSong);
    app.delete('/deletesong/:id',[authJwt.verifyToken,admin.isAdmin],songController.deleteSong)
}
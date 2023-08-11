const userController = require('../controllers/user.controller');
const reqBody = require('../middlewares/reqBody');
const authJwt = require('../middlewares/authjwt');
const isAdminOrUser = require('../middlewares/isAdminOrUser');
const idChecker = require('../middlewares/idchecker');




module.exports = (app) => {
    app.post('/google/registration/login',[ reqBody.emailCheck],userController.createGoogle);
    app.post('/facebook/registration/login',[reqBody.emailCheck],userController.createFacebook);
    app.put('/updateUser/:id',[idChecker.idCheck,authJwt.verifyToken,isAdminOrUser.AdminOrOwner],userController.update);
    app.put('/forgetPassword',[reqBody.userCheckEmail],userController.passUpCreate);
    app.delete('/deleteUser/:id',[idChecker.idCheck,authJwt.verifyToken,isAdminOrUser.AdminOrOwner],userController.deleteUser);
    app.get('/userPlaylist',[authJwt.verifyToken],userController.getUserPlaylist);
    app.put('/favriotesong/:id',[authJwt.verifyToken,idChecker.idCheck],userController.favrioteSong);
    app.get('/mostplayedsong',[authJwt.verifyToken],userController.getmostPlayedSong);
    app.get('/userfavriotesong',[authJwt.verifyToken],userController.getfavrioteSongs);
    app.put('/playsong/:id',[authJwt.verifyToken,idChecker.idCheck], userController.PlayedSong);
    app.put('/followingartist/:id',[authJwt.verifyToken],userController.followingArtist);
    app.put('/sing/:id',[authJwt.verifyToken,idChecker.idCheck],userController.evaluateAccuracy);
    app.get('/ranking',[authJwt.verifyToken],userController.ranking);
}

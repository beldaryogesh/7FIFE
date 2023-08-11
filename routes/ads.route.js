const adController = require('../controllers/Ads.controller');
const idChecker = require('../middlewares/idchecker');
const authJwt = require('../middlewares/authjwt');
const AdminCheck = require('../middlewares/Admin')



module.exports = (app) => {
    app.post('/createad',[authJwt.verifyToken,AdminCheck.isAdmin],adController.create);
    app.get('/getads',[authJwt.verifyToken,AdminCheck.isAdmin],adController.getad);
    app.put('/updateAds/:id',[idChecker.idCheck,authJwt.verifyToken,AdminCheck.isAdmin],adController.updateAds);
    app.delete('/deleteAds/:id',[idChecker.idCheck,authJwt.verifyToken,AdminCheck.isAdmin],adController.deletead)
}
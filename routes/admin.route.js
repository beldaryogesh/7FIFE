const reqBody = require('../middlewares/reqBody');
const authController = require('../controllers/auth.controller');
const adminController = require('../controllers/Admin.controller');
const adminCheck = require('../middlewares/Admin');
const authJwt = require('../middlewares/authjwt');




module.exports = (app) => {

  app.post('/admin/register',adminController.createAdmin);
  app.post('/admin/login', [reqBody.bodyCheck], authController.signIn);
  app.get('/admin/getUserList', [authJwt.verifyToken, adminCheck.isAdmin], adminController.getList);
  app.put('/admin/update/:id', [authJwt.verifyToken, adminCheck.isAdmin], adminController.update)

}


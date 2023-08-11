const authController = require('../controllers/auth.controller');
const reqBody = require('../middlewares/reqBody');




module.exports = (app) => {
    app.post('/register', [reqBody.bodyCheck],authController.signUp);
    app.post('/login',[reqBody.bodyCheck],authController.signIn);
}
const notificationController = require('../controllers/notification.controller')
console.log('hhhhhhhhhhhhhhhhhhhhhh')
module.exports = (app) => {
   
    app.post('/notification',notificationController.createNotification);
}
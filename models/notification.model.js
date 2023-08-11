const mongoose = require('mongoose');
const constant = require('../util /notification.constant')

const notificationSchema = new mongoose.Schema({
    sendTo: {
        type: [String],
        enum: [constant.sendTo.toAll, constant.sendTo.host, constant.sendTo.specific],
        required: true
    },
    Type: {
        type: [String],
        enum: [constant.notificationType.email, constant.notificationType.sms, constant.notificationType.push],
        required: true
    },
    user: {
        type: [String],
        default: []
    },
    Title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    recipients: {
        type: [mongoose.SchemaType.objectId],
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
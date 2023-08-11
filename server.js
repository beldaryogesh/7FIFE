const express = require('express');
const mongoose = require('mongoose');
const app = express();
const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const bodyParser = require('body-parser');
const multer = require('multer');
const update_demo = multer();




  


// app.use(update_demo.none());
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(dbConfig.URI);
const db = mongoose.connection;
db.on("error", () => {
    console.log("error while connecting to DB");
});
db.once("open", () => {
    console.log("connected to Mongo DB ")
});



app.listen(serverConfig.PORT, () => {
    console.log(`Application started on the port num : ${serverConfig.PORT}`);
})





// Configure Multer for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Specify the directory where files will be uploaded
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split(".").pop();
      cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
    },
  });
  
  const upload = multer({storage : storage});
  

app.use(upload.any());



require('./routes/auth.route')(app);
require('./routes/user.route')(app);
require('./routes/admin.route')(app);
require('./routes/subscription.route')(app);
require('./routes/ads.route')(app);
require('./routes/adsSetting.route')(app);
require('./routes/review.route')(app);
require('./routes/payment.route')(app);
require('./routes/form.route')(app);
require('./routes/notification.route')(app);
require('./routes/privacy.route')(app);
require('./routes/TermsandCondition.route')(app);
require('./routes/song.route')(app);
require('./routes/artist.route')(app);
require('./routes/album.route')(app);
require('./routes/playlist.route')(app);
require('./routes/reward.route')(app);








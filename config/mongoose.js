require('dotenv').config()

// require mongoose
const mongoose = require('mongoose');
const dbUrl = process.env.dbURL;

// connect mongoose 
// mongoose.connect(process.env.localdb);
mongoose.connect(dbUrl,{
    useUnifiedTopology: true,
   // useNewUrlParser: true,
   // useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error in connecting to db"));

db.once('open', function () {
    console.log("connected to :: mongo db")
})

module.exports = db;
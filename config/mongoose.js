require('dotenv').config()

// require mongoose
const mongoose = require('mongoose');
const dbURL = "mongodb+srv://SATYAMDCS:Qazwsx123%40@cluster0.s9qyivh.mongodb.net/?retryWrites=true&w=majority"

// connect mongoose 
// mongoose.connect(process.env.localdb);
mongoose.connect(process.env.dbURL);          //process.env.DATABASE);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "error in connecting to db"));

db.once('open', function () {
    console.log("connected to :: mongo db")
})

module.exports = db;
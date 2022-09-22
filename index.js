require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT;
const path = require('path')
const fs = require('fs')
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo') 
const db = require('./config/mongoose'); // require db

//console.log(process.env);

// use assets
app.use(express.static('./assets'));

// use express layout
app.use(expresslayouts);

// extract styles
app.set('layout extractStyles', true);
// extract sripts
app.set('layout extractScripts', true);

// use ejs as view engine
app.set('view engine', 'ejs');
// views folder
app.set('views', './views');


// use router 
app.use('/', require('./router'));


// start surver on port
app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running Surver : ${port}`);
        return;
    }
    console.log(`Surver is running on port : ${port}`);
})
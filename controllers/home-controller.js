const fs = require('fs');
const parse = require('csv-parser');
const assert = require('assert');
const multer = require('multer');
const FilePath = require('../models/file-path');


const storage =  multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: async function(req,file,cb){
        // rename file
        let fileName = "file-"+ Date.now() + ".csv";
        let path = "./uploads/" + fileName;

        // store file path in moongose
        
        cb(null, fileName);
        await FilePath.create({
            name: "file",
            file: file.originalname,
            path: path      
        })
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb)=>{

        // CSV validator
        if(file.mimetype == 'text/csv'){
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("only .csv file allowed !"));
        }
    }
}).single('myFile');






// home page controller
module.exports.home =  async (req, res) => {
    try{
        let files = await FilePath.find();
        return res.render('home', {files:files})
    }catch(err){
        console.log(err);
        res.redirect('back');
    }
}


// upload controller
module.exports.uploadFile = (req, res) =>{

    try{
        upload(req,res,function(err) {
            if(err) {  
                console.log(err);
                return res.end("Error uploading file.");  
            }  
            console.log('uploaded')
    
            res.redirect('back');
        });  
    
    }catch(err){
        console.log(err);
        res.redirect('back');

    }
}


// csv display controller : it converts the csv data to array
module.exports.csvDisplay = (req, res) => {
    try{
        if(req.params.id){
            var csvData = [];
            let flag = true;
            fs.createReadStream('./uploads/' + req.params.id)
            .pipe(parse())
            .on('data', (row) => {
                if(flag){
                    let keys = Object.keys(row);
                    flag = false;
                    csvData.push(keys);
                }
                let dataArray = Object.keys(row).map(function(k){return row[k]});
                csvData.push(dataArray);
            })
            .on('end', ()=> {
                console.log('csv file processed successfully');
                res.render('csv-view', { csvData: csvData})
            });
        } else {
            res.redirect('/')
        }

    }catch(err){
        console.log(err);
        res.redirect('back');
    }   
}
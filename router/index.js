const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home-controller')

// home router
router.get('/', homeController.home);

// csv view router
router.get('/csv-view/:id', homeController.csvDisplay);

// upload csv router
router.post('/uploadfile', homeController.uploadFile);


module.exports= router
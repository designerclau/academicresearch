const express = require('express');
const route = express.Router();
//var paperDB = require('../model/Post');
const services = require('../services/render');
const controller = require('../controller');
const multer = require('multer');

//upload file
var storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, './uploads');
    },
    filename:function(req, file, cb){
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    },
});



var upload = multer({
    storage:storage,
    

}).single('paperfile');

route.get('/', services.homeRoutes);

route.get('/add_paper', services.add_paper);

route.get('/update_paper', services.update_paper);

//API to create users
route.post('/api/papers', upload, controller.create);


//retrieve and return all papers or a single one
route.get('/api/papers', controller.find);

//update paper by id
route.put('/api/papers/:id', controller.update);

//delete paper by id
route.delete('/api/papers/:id', controller.delete);

module.exports = route
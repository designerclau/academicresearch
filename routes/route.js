const express = require('express');
const route = express.Router();
var paperDB = require('../model/Post');
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

////API to find text
route.get('/look/:tags', controller.findtext);

route.get('/search', controller.search);

//retrieve and return all papers or a single one
route.get('/api/papers', controller.find);

//update paper by id
route.put('/api/papers/:id', upload, controller.update);

//delete paper by id
route.delete('/api/papers/:id', controller.delete);

//route.get('/searchingbytext', controller.searchingbytext);

function simplify(text){
    const separators = /[s,.;:()-'+]/g;
    const diacritics = /[u0300-u036f]/g;
    //capitalização e normalização
    text = text.toUpperCase().normalize("NFD").replace(diacritics, "");
    //separando e removendo repetidos
    const arr = text.split(separators).filter((item, pos, self) => self.indexOf(item) == pos);
    console.log(arr);
    //removendo nulls, undefineds e strings vazias
    return arr.filter(item => (item));
}
/* GET home page. */
route.get('/searching', function(req, res, next) {
    if(!req.query.q)
      return res.render('searching', { title: 'Motor de Busca', papers: [], query: '' });
    else {
      const query = req.query.q;
      
       paperDB.find({tags: {$all: query }})
                 //.then(cursor => cursor.toArray())
                 .then(papers => {
                   return res.render('searching', {title: 'Motor de Busca', papers, query: req.query.q});
                 })
    }
  });

module.exports = route
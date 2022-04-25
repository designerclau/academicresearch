const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller');

route.get('/', services.homeRoutes);

route.get('/add_paper', services.add_paper);

route.get('/update_paper', services.update_paper);

//API to create users
route.post('/api/papers', controller.create);

//retrieve and return all papers or a single one
route.get('/api/papers', controller.find);

//update paper by id
route.put('/api/papers/:id', controller.update);

//delete paper by id
route.delete('/api/papers/:id', controller.delete);

module.exports = route
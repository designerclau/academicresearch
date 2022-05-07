const axios = require('axios');
const { param } = require('../routes/route');

exports.homeRoutes=(req,res) =>{
    //make a get request to the api/papers
    axios.get('http://localhost:3002/api/papers')
      .then(function(response){
        res.render("index",{papers:response.data});
      })
      .catch(err =>{
          res.send(err);
      })
}


exports.add_paper=(req,res) =>{
    res.render("add_paper")
}

exports.update_paper=(req,res) =>{
    axios.get('http://localhost:3002/api/papers', {params:{id:req.query.id}})
    .then(function(paperdata){
        res.render("update_paper",{papers:paperdata.data});
    })
    .catch(err =>{
          res.send(err);
    })
    
}
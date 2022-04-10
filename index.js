//main file

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const papers = require('./model/Post');
const { request } = require('express');
require('dotenv/config');



let responseObj = {
    "status": "",
    "msg": "",
    "body": {

    }
}
const app = express();

app.use(express.json());
app.use(bodyparser.json());


//show process
app.get('/process', async(req, res) => {

    res.send(process.env);
    
});

//used to adding papers into the database
app.post('/addingpaper', async(req, res) => {

    try
    {
       console.log("req.body: ", req.body);
       const newPaper = new papers({
          title:req.body.title,
          author:req.body.author,
          link:req.body.link,
          university:req.body.university,
          datepub:req.body.datepub

       });
       await papers.create(newPaper);
      
      res.send("Paper added")
    } catch (err){
        res.status(500).json({ message: error.message});
    }
    
});

//used to list all papers from the database
app.get('/paperlist', async(req, res) => {

    try
    {
       const paper = await papers.find();
       res.json(paper);

    } catch (err){
        res.status(500).json({ message: error.message});
    }
    
});

//list the title or body from the database * working
app.get('/look/:text', async(req, res) => {
  
    var query = req.params.text;
    console.log(query);
    try
    {
       var queryString=JSON.stringify(query);
       const paper = await papers.find({"$text": { $search: queryString }});
       res.json(paper);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
    
});


 

  
  //connect to database
  mongoose.connect( process.env.DB_connection, () =>
                  console.log('Connected to Db')
   );


  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`Listening on port ${port} `));
  
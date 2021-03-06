//main file

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const papers = require('./model/Post');
const { request } = require('express');
const path = require('path');
const res = require('express/lib/response');
require('dotenv/config');
const session = require('express-session');
const cors = require("cors");


let responseObj = {
    "status": "",
    "msg": "",
    "body": {

    }
}
const app = express();
//requests timing
app.use(morgan('tiny'));
app.use(express.json());

//parser request to bodyparser
//app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set('view engine','ejs');
app.use('/', require('./routes/route'));
app.use(cors());



//Express Messages Middleware



app.use("/css", express.static(path.join(__dirname,"node_modules/mdb-ui-kit/css")));
app.use("/js", express.static(path.join(__dirname,"node_modules/mdb-ui-kit/js")));

var collection;
//connect to database
mongoose.connect( process.env.DB_connection, () =>
                  console.log('Connected to Db')
                  

                  
 );

 

const port = process.env.PORT || 3003;
app.listen(port, () => console.log(`Listening on port ${port} `));
  
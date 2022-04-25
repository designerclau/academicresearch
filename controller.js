var paperDB = require('./model/Post');

//create and save new paper
exports.create = (req,res)=>{

    //validate the request
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"})
        return;
    }

    //new paper
   
      const newPaper = new paperDB({
        title:req.body.title,
        author:req.body.author,
        urlstring:req.body.urlstring,
        university:req.body.university,
        datepub:req.body.datepub
       });

       //save paper

       newPaper
         .save(newPaper)
         .then(data =>{
            // res.send(data)
             res.send({message: "Paper inserted successfuly"});
             res.redirect('/');
         })
         .catch(err =>{
             res.status(500).send({
                 message: err.message||"Some error occured"
             });
         });
}

//find papers or a single paper
exports.find = (req,res)=>{
    if(req.query.id){

        const id = req.query.id;
 
        paperDB.findById(id)
           .then(data =>{
               if(!data){
                  res.status(404).send({message: "Cannot find a paper with id "+id+". Maybe paper not found!"})
               }else{
                  res.send(data);
               }
            })
            .catch(err =>{
                res.status(500).send({
                    message: err.message||"Some error occured while finding the paper"
                });
            });
    }else{
        paperDB.find()
        .then(data =>{
          res.send(data)
      })
      .catch(err =>{
          res.status(500).send({
              message: err.message||"Some error occured"
          });
      });
    }
   
}

//update papers by id
exports.update = (req,res)=>{
   //validate the request
   if(!req.body){
      res.status(400).send({message:"Content cannot be empty"})
      return;
   }

  //update paper
  const id = req.params.id;
  paperDB.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
     .then(data =>{
         if(!data){
            res.status(404).send({message: "Cannot update paper with id ${id}. Maybe paper not found!"})
         }else{
            res.send(data);
         }
   
     })
     .catch(err =>{
         res.status(500).send({
             message: err.message||"Some error occured"
         });
     });
}

//delete papers by id
exports.delete = (req,res)=>{
    const id = req.params.id;
    paperDB.findByIdAndDelete(id)
     .then(data =>{
         if(!data){
            res.status(404).send({message: "Cannot delete paper with id ${id}. Maybe id is wrong!"})
         }else{
            res.send({message: "Paper deleted successfuly"});
         }
   
     })
     .catch(err =>{
         res.status(500).send({
             message: err.message||"Could not delete the paper with id ${id}"
         });
     });
}
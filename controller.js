var paperDB = require('./model/Post');
const multer = require('multer');
const { vary } = require('express/lib/response');
sw = require('stopword');



//create and save new paper
exports.create = (req, res) => {

    //validate the request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" })
        return;
    }

    //new paper
    var tagresult = [];
   
    tagresult = generateTags(req.body.title);
    console.log(tagresult);

    const newPaper = new paperDB({
        title: req.body.title,
        author: req.body.author,
        paperfile: req.file.filename,
        university: req.body.university,
        datepub: req.body.datepub,
        tags:[tagresult]
    });

    //save paper

    newPaper
        .save(newPaper)
        .then(data => {

            res.redirect('/add_paper');

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        });
}

stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']

//function to generate tags
function generateTags(papers) {
    var tags = [];

    var oldString = papers.split(' ');
    var newString = sw.removeStopwords(oldString);
    tags.push(newString);
    // console.log(tags);

   
    return tags;

}

function removeDuplicates(data){
    return [...new Set(data)]
}


//find papers or a single paper
exports.find = (req, res) => {
    if (req.query.id) {

        const id = req.query.id;

        paperDB.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Cannot find a paper with id " + id + ". Maybe paper not found!" })
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured while finding the paper"
                });
            });
    } else {
        paperDB.find()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occured"
                });
            });
    }

}

//update papers by id
exports.update = (req, res) => {
    //validate the request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" })
        return;
    }

    //update paper
    const id = req.params.id;
    paperDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update paper with id ${id}. Maybe paper not found!" })
            } else {
                res.send(data);
            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        });
}

//delete papers by id
exports.delete = (req, res) => {
    const id = req.params.id;
    paperDB.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete paper with id ${id}. Maybe id is wrong!" })
            } else {
                res.send({ message: "Paper deleted successfuly" });
            }

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Could not delete the paper with id ${id}"
            });
        });
}


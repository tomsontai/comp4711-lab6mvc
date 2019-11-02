const express = require('express');
let app = express();
let mod = require('../artistData');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ktai8:l6mHXsvbPiRJZbkF@cluster0-ag0ai.mongodb.net/test?retryWrites=true&w=majority";


const router = express.Router();
const client = new MongoClient(uri, { 
   useUnifiedTopology: true,
   useNewUrlParser: true 
 });

 

 const assert = require("assert");
 const mongoose = require('mongoose');
 
 //DB name
 const databaseName = "artistapp";
 
 //Collection name
 const collectionName = "artists";
 
 client.connect(err => {
   const collection = client.db(databaseName).collection(collectionName);
   // perform actions on the collection object
   client.close();
 });
 
 // connect Mongoose to your DB
 mongoose.connect(uri, 
   {
       useUnifiedTopology: true,
       useNewUrlParser: true
   }
 );
 
 //Middleware
 app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });
 app.use(express.json());

mod.init();

router.get('/', function (req,res) {
   res.redirect(301, '/artists');
});

router.get('/delete/:id', (req,res) => {
   console.log("============Get Delete Artist=================");
   console.log(req.params.id);
   let id = Number(req.params.id);
   mod.delete(id); 

   // console.log(mod.getall());
   res.redirect(301, '/artists');
});

router.post('/delete/:id', (req,res) => {
   console.log("============Get Delete Artist=================");
   console.log(req.params.id);
   let id = Number(req.params.id);
   mod.delete(id); 

   // console.log(mod.getall());
   res.redirect(301, '/artists');
});

// Renders all the artists. Need to modify to get from database. 
router.get('/artists', (req,res) => {
   client.connect((err) => {
      assert.equal(null, err);
      console.log("DB connection established.");
      const collection = client.db(databaseName).collection(collectionName);
      collection.find({}).toArray(function(err, result) {
         if (err) throw err;
            console.log(result);
         collection.close();
      });

      res.render('artists');
      // collection.find({}, { sort: { score: -1 } }).toArray((err, data) => {
      //     if (err) {
      //         console.log("get error");
      //         console.log(err);
      //         res.sendStatus(500);
      //     } else {
      //         console.log("get successful");
      //       //   res.json(data);
              
      //     }
      // });
  });

   //  let Artists = mod.getall();
   // //  console.log("All artists:")
   //  console.log(Artists);
   //  res.render('artists', {artist: Artists });
});

// Renders the add form handlebars
router.get('/artist/add', (req,res) => {
    res.render('artistadd');
 });


 // QUERY?? 
router.post('/artists/search', (req,res) => {
   console.log("==== Search ====");
   let a_name = req.body.name;
   let SearchResult = mod.search(a_name);
   res.render('artists', {artist: SearchResult });
   //res.render('artistadd');
   //res.redirect(301, '/artists');
}); 



// Add to database
 router.post('/artists', (req, res) => {
    let a_name = req.body.name;
    let a_about = req.body.about;
    let a_imageURL = req.body.imageURL;

     let count = mod.count;

    let aOject = {
       id: count,
       name: a_name,
       about: a_about,
       imageurl: a_imageURL
    }

    client.connect((err) => {
      assert.equal(null, err);
      console.log("DB connection established.");
      const db = client.db(databaseName);
      
      db.collection(collectionName).insertOne(aOject, (err) => {
          if (err) {
              console.log("post error");
              console.log(err);
              res.sendStatus(500);
          } else {
              console.log("post successful");
              res.sendStatus(200);
              
          }
      });
   });

   // NEED THIS ANYMORE???? vvvv
   //  mod.add(aOject);

    //console.log(mod.getall());
    res.redirect(301, '/artists');

    // NEED THIS ANYMORE??? ^^^^
  });


 // Defines a custom 404 Page and we use app.use because
// the request didn't match a route (Must follow the routes)
// router.use(function(req, res) {
//     // Define the content type
//     res.type('text/html');
   
//     // The default status is 200
//     res.status(404);
   
//     // Point at the 404.handlebars view
//     res.render('partials/404');
// });

 module.exports = router;
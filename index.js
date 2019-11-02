let express = require('express');  
let app = express();
let fs = require("fs");  
let bodyParser = require('body-parser');
let multer = require('multer');
let path = require('path');
const expressHbs = require('express-handlebars');
const port = process.env.PORT || 3000
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ktai8:l6mHXsvbPiRJZbkF@cluster0-ag0ai.mongodb.net/test?retryWrites=true&w=majority";

//DB client
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

app.use(express.static(__dirname + '/public'));

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

let playerRoutes = require('./routes/artists');



// app.use(express.static('public'));


  // Custom 500 Page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500);

    // Point at the 500.handlebars view
    res.render('partials/500');
});

  // Custom 404 Page
//   app.use(function(err, req, res, next) {
//     console.error(err.stack);
//     res.status(404);

//     // Point at the 500.handlebars view
//     res.render('partials/404');
// });

// ??? may need to change!!!
// app.get('/scores', (req, res) => {
//   client.connect((err) => {
//       assert.equal(null, err);
//       console.log("DB connection established.");
//       const collection = client.db(databaseName).collection(collectionName);

//       collection.find({}, { sort: { score: -1 } }).toArray((err, data) => {
//           if (err) {
//               console.log("get error");
//               console.log(err);
//               res.sendStatus(500);
//           } else {
//               console.log("get successful");
//               res.json(data);
//           }
//       });
//   });
// });

// may need to change !!!
// app.post('/scores', (req, res) => {
//   client.connect((err) => {
//       assert.equal(null, err);
//       console.log("DB connection established.");
//       const db = client.db(databaseName);
      
//       db.collection(collectionName).insertOne(req.body, (err) => {
//           if (err) {
//               console.log("post error");
//               console.log(err);
//               res.sendStatus(500);
//           } else {
//               console.log("post successful");
//               res.sendStatus(200);
//           }
//       });
//   });
// });



app.use(playerRoutes);

 app.listen(port, () => console.log('Server ready'));

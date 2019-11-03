//const express = require('express');
//et app = express();
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ktai8:l6mHXsvbPiRJZbkF@cluster0-ag0ai.mongodb.net/test?retryWrites=true&w=majority";


//const router = express.Router();
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
 
//  client.connect(err => {
//    const collection = client.db(databaseName).collection(collectionName);
//    // perform actions on the collection object
//    client.close();
//  });
 
//  // connect Mongoose to your DB
//  mongoose.connect(uri, 
//    {
//        useUnifiedTopology: true,
//        useNewUrlParser: true
//    }
//  );
var findArtists = function(db, callback) {
    client.connect(err => { 
        collection = client.db(databaseName).collection(collectionName);
        collection.find().toArray(function(err, artists) {
            if (err) {
                return callback(err);
            } else {
            //console.log(artists);
                return callback(artists);
            }
        });
    });
}

// MongoClient.connect(uri, function(err, db) {
//     console.log("Connected successfully to DB");
//     findArtists(db, function() {
//         db.close();
//     });
// })


let a = [];
let count = 0;

var obj = {
    artists: []
};

var fs = require('fs');

function initializeArray() {
    // console.log("Initialize Database is called");
    // var content = fs.readFileSync("mylocalfile.json");

    // console.log("Output Content : \n"+ content);
    // console.log("\n *EXIT* \n");

    // var jsonContent = JSON.parse(content);
    // console.log("length of json:", jsonContent.artists.length);
    // console.log("id:", jsonContent.artists[0].id);
    // console.log("name:", jsonContent.artists[0].name);
    // console.log("about:", jsonContent.artists[0].about);
    // console.log("url:", jsonContent.artists[0].imageurl);

    // for (let i = 0; i < jsonContent.artists.length; i++) {
    //     jsonContent.artists[i].id = count++;
    //     a.push(jsonContent.artists[i]);
    // }

}

function addArtists(e, callback) {
    client.connect((err) => {
        assert.equal(null, err);
        console.log("DB connection established.");
        const db = client.db(databaseName);

        db.collection(collectionName).insertOne(e, (err) => {
            if (err) {
                console.log("post error");
                console.log(err);
                callback;
            } else {
                console.log("post successful");
                callback;
            }
        });
    });

    // e.id = count;
    // count = count + 1;
    // a.push(e); // probably don't need this anymore. Need to remove the array object "a"

    // obj.artists.push(e);
    // var jsonObj =   JSON.stringify(obj);
    
    // fs.writeFile("mylocalfile.json", jsonObj, function(err) {
    //     if (err) throw err;
    //     console.log('write to JSON complete');
    // });
}

function getAllArtists(callback) {
    //var artistlist;
    //var artists;
    MongoClient.connect(uri, function(err, db) {
        if (err) {
            return callback(err);
        } else {
            console.log("Connected successfully to DB");
            findArtists(db, function(artists) {
                //console.log("Find artists:");
                //artistlist = JSON.parse(JSON.stringify (artists));
                console.log(artists);
                callback(null, artists);
                db.close();
            });
        }
    });
}

function getArtist(id) {

    return a[id];
    //return fs[id];
}

function getCount() {
    return a.length;
}

function deleteArtist(id) {
     for (var i = 0; i < a.length; i++) {
        if (a[i].id == id) {
            a.splice(i, 1);
        }
    }
 }

 function searchArtists(matchString) {
    let arr = [];
    for (var i = 0; i < a.length; i++) {
         if (a[i].name.toUpperCase().indexOf(matchString.toUpperCase()) !== -1) {
             arr.push(a[i]);
        }
    }
    
    return arr;
 }

module.exports = {
    init : initializeArray,
    add : addArtists,
    getall : getAllArtists,
    getpeople: getArtist,
    count: getCount(),
    delete: deleteArtist,
    search: searchArtists
}

function setArtistDataToPOST() {
    let artistName = document.getElementById("name").value;
    let artistAbout = document.getElementById("about").value;
    let artistImageURL = document.getElementById("imageURL").value;

    let artistData = {name : artistName , about : artistAbout, imageURL : artistImageURL};

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(artistData)
    };s

    fetch('/artists', options);
    // window.location.href = "leaderboard.html";

    // players.push(score);

    // localStorage.players = JSON.stringify(players);
}

function getAllArtistFromDB () {

}
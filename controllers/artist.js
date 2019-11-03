let artistModel = require("../models/artistData");

exports.getAllArtists = (req, res, next) => {
    //let Artists = artistModel.getall();
    artistModel.getall( function(err, Artists) {
        if (err){
            console.log("Error! : " + err);
        } else {
            console.log("All artists:")
            console.log(Artists);
            res.render('artists', {artist: Artists });
        }
    } );
 }

exports.getAddArtist = (req, res, next) => {
    res.render('artistadd');
}

exports.postAddArtist = (req, res, next) => {
    artistModel.add(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("post artist");
            res.redirect(301, '/artists');
        }
    })

    let a_name = req.body.name;
    let a_about = req.body.about;
    let a_imageURL = req.body.imageURL;

     let count = artistModel.count;

    let aObject = {
       id: count,
       name: a_name,
       about: a_about,
       imageurl: a_imageURL
    }

   //    client.connect((err) => {
   //    assert.equal(null, err);
   //    console.log("DB connection established.");
   //    const db = client.db(databaseName);
      
   //    db.collection(collectionName).insertOne(aObject, (err) => {
   //        if (err) {
   //            console.log("post error");
   //            console.log(err);
   //            res.sendStatus(500);
   //        } else {
   //            console.log("post successful");
   //            //res.sendStatus(200);
   //            res.redirect(301, '/artists');
              
   //        }
   //    });
   // });

   // NEED THIS ANYMORE???? vvvv
    artistModel.add(aObject);

    // console.log(artistModel.getall());
    res.redirect(301, '/artists');

    // NEED THIS ANYMORE??? ^^^^
}

// SEARCH NOT WORKING !!!! 
exports.searchArtist = (req, res, next) => {
    console.log("==== Search ====");
    let a_name = req.body.name;
    let SearchResult = artistModel.search(a_name);
    res.render('artists', {artist: SearchResult });
    //res.render('artistadd');
    //res.redirect(301, '/artists');
}

exports.deleteArtist = (req, res, next) => {
    console.log("============Get Delete Artist=================");
    console.log(req.params.id);
    let id = Number(req.params.id);
    artistModel.delete(id); 
 
    // console.log(artistModel.getall());
    res.redirect(301, '/artists');
}
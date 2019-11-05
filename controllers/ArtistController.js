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

exports.getlogin = (req, res, next) => {
    res.render("home", {layout: 'login'});
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

    artistModel.add(aObject);

    // console.log(artistModel.getall());
    res.redirect(301, '/artists');

    // NEED THIS ANYMORE??? ^^^^
}

exports.deleteArtist = (req, res, next) => {
    console.log("============Get Delete Artist=================");
    console.log(req.params.id);
    // let id = Number(req.params.id);
    artistModel.delete(req.params.id); 
    
    // console.log(artistModel.getall());
    res.redirect(301, '/artists');
}


exports.searchArtist = (req, res, next) => {
    console.log("==== Search ====");
    let a_name = req.body.name;
    artistModel.search(a_name, function(Artists) {
        // if (err){
        //     console.log("Error! : " + err);
        //     res.render('artists');
        // } else {
            console.log("All artists:")
            console.log(Artists);
            res.render('artists', {artist: Artists });
        // }

    });


}

// exports.login = (req, res, next) => {
//     console.log("login");
//     let username = req.body.username;
//     let password = req.body.password;
//     console.log(username);
//     console.log(password);
//     artistModel.login(username, password, function(err, user) {
        
//         console.log(user);
//         console.log(err);
//         if (err === 404) {
//             return res.redirect('/login');
//         } else 
       
//         res.redirect('/artists');
//      });
// }

// exports.register = (req, res, next) => {
//     console.log("register");
//     let username = req.body.username;
//     let password = req.body.password;
//     let firstname = req.body.firstname;
//     let lastname = req.body.lastname;

//     let newUser = new User();
//     newUser.username = username;
//     newUser.password = password;
//     newUser.firstname = firstname;
//     newUser.lastname = lastname;

//     newUser.save(function(err, savedUser){
//         if (err) {
//             console.log(err);
//             return res.status(500).send();
//         } else {
//             return res.status(200).send();
//         }
//     })
// }
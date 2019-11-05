let User = require("../lib/user");
let artistModel = require("../models/artistData");

exports.login = (req, res, next) => {
    console.log("login");
    let username = req.body.username;
    let password = req.body.password;
    console.log(username);
    console.log(password);
    artistModel.login(username, password, function(err, user) {
        
        console.log(user);
        console.log(err);
        if (err === 404) {
            return res.redirect('/login');
        } else 
       
        res.redirect('/artists');
     });
}

exports.register = (req, res, next) => {
    console.log("register");
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    let newUser = new User();
    newUser.username = username;
    newUser.password = password;
    newUser.firstname = firstname;
    newUser.lastname = lastname;

    newUser.save(function(err, savedUser){
        if (err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).send();
        }
    })
}

exports.getlogin = (req, res, next) => {
    res.render("home", {layout: 'login'});
}


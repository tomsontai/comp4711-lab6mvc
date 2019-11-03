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

function addArtists(e) {
    e.id = count;
    count = count + 1;
    a.push(e); // probably don't need this anymore. Need to remove the array object "a"

    obj.artists.push(e);
    var jsonObj =   JSON.stringify(obj);
    
    // fs.writeFile("mylocalfile.json", jsonObj, function(err) {
    //     if (err) throw err;
    //     console.log('write to JSON complete');
    // });
}

function getAllArtists() {
    return a;
}

function getArtist(id) {

    return a[id];
    //return fs[id];
}

function getCount() {
    return a.length;
}

function deleteArtist(id) {
    //for (var i = a.length; i--;) {
    // for (var i = 0; i < a.length; i++) {
    //     if (a[i].id == id) {
    //         a.splice(i, 1);
    //     }
    // }
 }

 function searchArtists(matchString) {
    // let arr = [];
    // for (var i = 0; i < a.length; i++) {
    //      if (a[i].name.toUpperCase().indexOf(matchString.toUpperCase()) !== -1) {
    //          arr.push(a[i]);
    //     }
    // }
    
    // return arr;
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
    let tempScore = localStorage.Score;
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
    };

    fetch('/artists', options);
    // window.location.href = "leaderboard.html";

    // players.push(score);

    // localStorage.players = JSON.stringify(players);
}

function getAllArtistFromDB () {

}
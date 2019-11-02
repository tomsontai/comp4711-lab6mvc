const artistArray = [];

showAllArtists();


function add_Artist_Form() {
    var x = document.getElementById("inputForm");
    //console.log(x.style.display);
    if (x.style.display == "none" || x.style.display == "") {
        //console.log("aaa");
        x.style.display = "block";
      } else {
        //console.log("bbb");
        x.style.display = "none";
      }



}

function clearForm(){
    document.getElementById("inputFormId").reset();
}

// Modify this. 
function addToDatabase() {
    let artistText = document.getElementById("inputArtistText").value;
    let aboutText = document.getElementById("inputAboutText").value;
    let urlText = document.getElementById("inputURLText").value;
    
    if (artistText != '' && aboutText != '' && urlText != ''){
        //var temporaryArray = [aboutText, urlText];
        var obj = { about: aboutText, url: urlText };

        // This stores the key for search later. 
        // artistArray.push(artistText);

        // localStorage.setItem(artistText, JSON.stringify(obj));

        // console.log("Testing local storage: " + JSON.parse(localStorage.getItem(artistText)).about);
        // console.log("Testing local storage: " + JSON.parse(localStorage.getItem(artistText)).url);

    }


}

// SHOWS all artists currently in local storage
function showAllArtists() {
    if (window.localStorage.length > 0) {
        for (i = 0, len = localStorage.length; i < len; ++i) {
            var artistClass = document.createElement('div');
            artistClass.setAttribute('class', 'artist');
            // artistClass.setAttribute('id', localStorage.key(i));

            console.log("Calling showAllArtists() method")

            var artistImg = document.createElement('div');
            artistImg.setAttribute('class', 'artistImage');
            var imageSrc = document.createElement('img');
            // imageSrc.src = JSON.parse(localStorage.getItem(localStorage.key(i))).url;  // artistText is not defined in this method.
            imageSrc.setAttribute('class', 'imageProperty');         
            artistImg.appendChild(imageSrc);


            artistClass.appendChild(artistImg);

            var artistInfoClass = document.createElement('div');
            var artistTitleClass = document.createElement('div');
            var artistDescClass = document.createElement('div');
            
            artistInfoClass.setAttribute('class', 'artistInfo');
            artistTitleClass.setAttribute('class', 'artistTitle');
            artistDescClass.setAttribute('class', 'artistDesc');

            // artistTitleClass.textContent = localStorage.key(i);
            // artistDescClass.textContent = JSON.parse(localStorage.getItem(localStorage.key(i))).about;
            
            artistInfoClass.appendChild(artistTitleClass);
            artistInfoClass.appendChild(artistDescClass);
            
            

            artistClass.appendChild(artistInfoClass);

            var deleteButtonClass = document.createElement("INPUT");
            deleteButtonClass.setAttribute("type", "button");
            deleteButtonClass.setAttribute("value", "Delete");
            deleteButtonClass.setAttribute("id", "delete" + i);
            deleteButtonClass.setAttribute("onclick", "deleteFunction(this)");
            deleteButtonClass.setAttribute("name", localStorage.key(i));
            deleteButtonClass.setAttribute("class", "btn btn-danger");

            
            //deleteButtonClass.addEventListener('onClick', 'deleteFunction()');
            artistClass.appendChild(deleteButtonClass);

            var ulElementId = document.getElementById("ulElement");
            console.log(artistClass);
            ulElementId.appendChild(artistClass);
        }

    }
    console.log("function called to here!");
}

function showInfo() { // Displays the artist being added to the array.
    console.log("Calling showInfo() method");
 

    let artistText = document.getElementById("inputArtistText").value;
    let aboutText = document.getElementById("inputAboutText").value;
    let urlText = document.getElementById("inputURLText").value;

    if (window.localStorage.length > 0 && artistText != '' && aboutText != '' && urlText != '') {
        var artistClass = document.createElement('div');
        artistClass.setAttribute('class', 'artist');
        // artistClass.setAttribute('id', localStorage.key(0));

        var artistImg = document.createElement('div');
        artistImg.setAttribute('class', 'artistImage');
        var imageSrc = document.createElement('img');
        imageSrc.src = JSON.parse(localStorage.getItem(artistText)).url;
        imageSrc.setAttribute('class', 'imageProperty');

        artistImg.appendChild(imageSrc);


        artistClass.appendChild(artistImg);

        var artistInfoClass = document.createElement('div');
        var artistTitleClass = document.createElement('div');
        var artistDescClass = document.createElement('div');
        
        artistInfoClass.setAttribute('class', 'artistInfo');
        artistTitleClass.setAttribute('class', 'artistTitle');
        artistDescClass.setAttribute('class', 'artistDesc');

        artistTitleClass.textContent = artistText;
        // artistDescClass.textContent = JSON.parse(localStorage.getItem(artistText)).about;

        
        artistInfoClass.appendChild(artistTitleClass);
        artistInfoClass.appendChild(artistDescClass);

        artistClass.appendChild(artistInfoClass);

        var deleteButtonClass = document.createElement("INPUT");
        deleteButtonClass.setAttribute("type", "button");
        deleteButtonClass.setAttribute("value", "Delete");
        deleteButtonClass.setAttribute("id", "delete" + "0");
        deleteButtonClass.setAttribute("onclick", "deleteFunction(this)");
        // deleteButtonClass.setAttribute("name", localStorage.key(0));
        deleteButtonClass.setAttribute("class", "btn btn-danger");

        
        artistClass.appendChild(deleteButtonClass);

        var ulElementId = document.getElementById("ulElement");
        ulElementId.appendChild(artistClass);

        //console.log("name = " + deleteButtonClass.name);

    }

    // CLEAR FORM
    document.getElementById("inputFormId").reset();
}

function deleteFunction(obj) {
    console.log("delete function is called");
    var x = document.getElementById("delete");
    var y = document.getElementById("ulElement");
    
    console.log("Object is " + obj.name);

    
    window.localStorage.removeItem(obj.name);
    //if (this) {
        
       // console.log("what's this? " + x.name);
        //artistArray.splice(parseInt(obj.name, 10), 1);
       y.remove();
    //}
    var z = document.getElementById("baseDiv");

    if (!document.getElementById("ulElement")) {
        var zz = document.createElement("ul");
        zz.setAttribute("id", "ulElement");

        z.appendChild(zz);

    }
    //var x = document.getElementById("ulElement");
    //x.remove(x.selectedIndex);

    // var y = document.getElementById("delete");
    // console.log(y.id);
    showAllArtists();

}

function search_Artist() {

    var inputText = document.getElementById("aFormNameId");

    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("aFormNameId");
    
    filter = input.value.toUpperCase();
    // ul = document.getElementById("ulElement");
    // li = ul.getElementsByTagName("li");
    for (i = 0; i < localStorage.length; i++) {
        //a = li[i].getElementsByTagName("a")[0];
        // FIX HERE LATER
        a = localStorage.key(i);

        //txtValue = a.textContent || a.innerText;
        if (a.toUpperCase().indexOf(filter) > -1) {
            document.getElementById(localStorage.key(i)).style.display = "";
            //li[i].style.display = "";
            

        } else {
            document.getElementById(localStorage.key(i)).style.display ="none";
        }
    }


    // console.log("value is " + inputText.value);
    // console.log("search function called");
}

// function displayData() {
//     // check if localstorage has stuff, if has stuff, show data. 
//     if (window.localStorage.length != 0) {
//         // load stuff
//         showAllArtists();
//     } 

//     // if empty, hide. 

// }
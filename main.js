// page counter to render from different page in this case animals-1,2,3 in link
var pageCounter = 1;


// Button element to show data
var btn = document.getElementById("btn");
btn.addEventListener("click",() => {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET','https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');
    ourRequest.onload = function() {
       
        if(ourRequest.status >= 200 && ourRequest.status < 400){

        const ourData = JSON.parse(ourRequest.responseText);
        renderHtml(ourData);
        }else {
            console.log('something wrong with the request!!!');
        }
    };


    ourRequest.onerror = function() {
        console.log("Request cannot solve!! connection error !!!");
    }



    ourRequest.send();
    pageCounter++;
    if(pageCounter > 3){
        // btn.classList.add("hide-me");

        document.getElementById('btn').style.display = "none";
    }
});

// HTML element actually showing data 

var animalContainer = document.getElementById("animal-info");
function renderHtml(data){
    var htmlString = "";

    for (let i = 0; i < data.length; i++){
        htmlString += "<p>" + data[i].name + " is a " + data[i].species + "that likes to eat ";

        for(let ii = 0; ii < data[i].foods.likes.length; ii++){
            if(ii == 0){

            htmlString += data[i].foods.likes[ii];
            }else {

            htmlString += " and " + data[i].foods.likes[ii];
            }
        }
        htmlString += " and dislikes ";
        for(let ii = 0; ii < data[i].foods.dislikes.length; ii++){
            if(ii == 0){

            htmlString += data[i].foods.dislikes[ii];
            }else {

            htmlString += " and " + data[i].foods.dislikes[ii];
            }
        }
        htmlString += ".</p><hr>";
    }

    animalContainer.insertAdjacentHTML('beforeend' , htmlString);
}


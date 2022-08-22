//Selectors
const form = document.getElementById('form');
const locationInput = document.getElementById('location');
const imageInput = document.getElementById('img')
const travelButton = document.querySelector(".list-button");
const travelList = document.querySelector(".travel-list");

// Event Listeners
travelButton.addEventListener("click", addPlace);
travelList.addEventListener('click', deleteItem);

//functions 
function addPlace(event) {
  
    event.preventDefault();
    //place DIV
    const placeDiv = document.createElement("div");
    placeDiv.classList.add("place");

    //Create LI
    const newPlace = document.createElement('li');
    newPlace.innerText = locationInput.value;
    newPlace.classList.add('new-place')

    //Create Img
    const newImage = document.createElement('img');
        if (imageInput.value == ""){
            newImage.src = "https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg"
        }else{
            newImage.src = imageInput.value
        } 
    newImage.classList.add('new-image')
    
    placeDiv.appendChild(newPlace);
    placeDiv.appendChild(newImage);

    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-ban"> </i>'
    deleteButton.classList.add("delete-btn");
    placeDiv.appendChild(deleteButton);

    //Append to list
    travelList.appendChild(placeDiv);

    //Clear travel input value
    imageInput.value = "";
    locationInput.value = "";
}


function deleteItem(e){
    const item = e.target;
    //Delete list
    if(item.classList[0] === 'delete-btn'){
        const place = item.parentElement;
        place.remove();
    }

}
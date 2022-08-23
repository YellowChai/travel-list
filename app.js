const form = document.getElementById('form')
const locationInput = document.getElementById('location');
const imageInput = document.getElementById('img')
const destInput = document.getElementById('destination');
const descriptionInput = document.getElementById('description');
const travelButton = document.querySelector(".list-button");
const travelList = document.querySelector(".travel-list");
const defaultImage ="https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg";

// Event Listeners
form.addEventListener("submit", addPlace);
travelList.addEventListener("click", deleteItem);

//functions 
function addPlace(event) {
  
    event.preventDefault();
    //place Div
    const placeDiv = document.createElement("div");
    placeDiv.classList.add("place");

    //Create dest List
    const newDest = document.createElement("li");
    newDest.innerText = destInput.value;
    newDest.classList.add('new-dest')
    placeDiv.appendChild(newDest);
    console.log(newDest)

    //Create description List
    const newDescription = document.createElement('li');
    newDescription.innerText = descriptionInput.value;
    newDescription.classList.add('new-description')
    placeDiv.appendChild(newDescription);
    console.log(newDescription)

    //Create location List
    const newPlace = document.createElement('li');
    newPlace.innerText = locationInput.value;
    newPlace.classList.add('new-place')
    placeDiv.appendChild(newPlace);
    console.log(newPlace)

    // Create Img
    const newImage = document.createElement('img');
    newImage.src = (imageInput.value === "") ? defaultImage : imageInput.value; 
    newImage.classList.add('new-image')
    placeDiv.appendChild(newImage);
    console.log(newImage.src);

    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-btn");
    placeDiv.appendChild(deleteButton);

    //Edit Button
    const editButton = document.createElement('button');
    editButton.innterText = "Edit";
    editButton.classList.add("edit-btn");
    placeDiv.appendChild(editButton);

    //Append to list
    travelList.appendChild(placeDiv);

    //Clear travel input value
    imageInput.value = "";
    locationInput.value = "";
    destInput.value = "";
    descriptionInput.value = "";    
}

function deleteItem(e){
    const item = e.target;
    console.log(item.classList)
    // Delete list
    if(item.classList[0] === 'delete-btn'){
        const place = item.parentElement;
        place.remove();
    }
}

// function editItem(e){
//     const item = e.target;
//     //Edit list
//     if(item.classList[0] === 'edit-btn'){
        
//     }
// }


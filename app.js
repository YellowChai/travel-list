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

// Delete or Edit 
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

    

    const requestUrl = 'https://api.unsplash.com/search/photos?query=' + newPlace.innerHTML + '-' + newDest.innerHTML+ '&client_id=Q41Uq_nT8K_r-7vPg_E035mTUIQwJbMvx18L9scLpfs';
    // Create Img
    const newImage = document.createElement('img');
    description.addEventListener('click', fetchImg());
    // newImage.src = (imageInput.value === "") ? defaultImage : imageInput.value; 
    async function fetchImg(){
        await fetch(requestUrl)
        .then(response => {
            return response.json();
        })
        .then(data => {
            let img = data.results[0].urls.regular;
            newImage.src = img;
            newImage.classList.add('new-image')
            
        })
    }

    
    //Edit Button
    const editButton = document.createElement('button');
    editButton.innerText = "Edit";
    editButton.classList.add("edit-btn");
    
    
    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-btn");
    

    //Append to list
    placeDiv.appendChild(newImage);
    placeDiv.appendChild(editButton);
    placeDiv.appendChild(deleteButton);

    travelList.appendChild(placeDiv);

    //Clear travel input value
   
    locationInput.value = "";
    destInput.value = "";
    descriptionInput.value = "";    
}


function deleteItem(e){
    const item = e.target;
    // Delete list

    if(item.classList[0] === 'delete-btn'){
        const place = item.parentElement;
        place.remove();
    }else if(item.classList[0] === 'edit-btn'){
        editItem(e);
    }
}

function editItem(e){
    const item = e.target;
    //Edit list
    if(item.classList[0] === 'edit-btn'){
        list = item.parentElement;
        const dest = list.querySelector(".new-dest");
        const location = list.querySelector(".new-place");
        const img = list.querySelector(".new-image");
        const description = list.querySelector(".new-description");

        const updatedDest = window.prompt("Enter new Destination");
        const updatedLocation = window.prompt("Enter new Location");
        const updatedImg = window.prompt("Enter new image url");
        const updatedDescription = window.prompt("Enter new description"); 
        
        updatedDest? dest.innerText = updatedDest : null;
        updatedLocation? location.innerText = updatedLocation : null;
        updatedImg? img.src = updatedImg : null;
        updatedDescription? description.innerText = updatedDescription : null;
    }
}


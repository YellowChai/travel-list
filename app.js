const form = document.getElementById('form')
const locationInput = form.location
const descriptionInput = form.description
const destInput = form.destination
const imgApiUrl = 'https://api.unsplash.com/search/photos?query='

// const key = config.API_KEY
const apiKey= "Q41Uq_nT8K_r-7vPg_E035mTUIQwJbMvx18L9scLpfs"
const travelList = document.querySelector(".travel-list");
const defaultImage ="https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg";
let updatedImg 

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
    const destLabel = document.createElement("LABEL");
    destLabel.innerText = "Destination:"
    newDest.appendChild(destLabel);
    newDest.innerText = destInput.value;
    newDest.classList.add('new-dest')
    

    //Create description List
    const newDescription = document.createElement('li');
    newDescription.innerText = descriptionInput.value;
    newDescription.classList.add('new-description')

    //Create location List
    const newPlace = document.createElement('li');
    newPlace.innerText = locationInput.value;
    newPlace.classList.add('new-place')

    //Create img with API img
    const requestUrl = imgApiUrl + newPlace.innerHTML + '-' + newDest.innerHTML+ '&client_id=' + apiKey;
    const newImg = document.createElement('img');
    description.addEventListener('click', updateImg());

    //Call fetch function to update the image
    async function updateImg() {
        await fetchImg(requestUrl)
            newImg.src = updatedImg;
            newImg.classList.add('new-image')
        } 

    const btnList = document.createElement('li')
    btnList.classList.add('btn-list')

    //Edit Button
    const editButton = document.createElement('button');
    editButton.innerText = "Edit";
    editButton.classList.add("edit-btn");
    btnList.appendChild(editButton)
      
    //Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-btn"); 
    btnList.appendChild(deleteButton)

    //Append to list
    placeDiv.appendChild(newDest);
    placeDiv.appendChild(newPlace);
    placeDiv.appendChild(newDescription);
    placeDiv.appendChild(newImg);
    placeDiv.appendChild(btnList);


    //Append the list to ul
    travelList.appendChild(placeDiv);

    //Clear travel input value
    locationInput.value = "";
    descriptionInput.value = "";    
    destInput.value = "";
}

function deleteItem(e){
    const item = e.target;
    // Delete list
    if(item.classList[0] === 'delete-btn'){
        const place = item.parentElement.parentElement;
        place.remove();
    }else if(item.classList[0] === 'edit-btn'){
        editItem(e);
    }
}

function editItem(e) {
    const item = e.target;
    //Edit list
    if(item.classList[0] === 'edit-btn'){
        const list = item.parentElement.parentElement;
        const dest = list.querySelector(".new-dest");
        const location = list.querySelector(".new-place");
        const newImg = list.querySelector(".new-image");
        const description = list.querySelector(".new-description");

        //window prompts
        const updatedDest = window.prompt("Enter new Destination");
        const updatedLocation = window.prompt("Enter new Location");
        const updatedDescription = window.prompt("Enter new description"); 
        
        //update destination and location 
        updatedDest? dest.innerText = updatedDest : null;
        updatedLocation? location.innerText = updatedLocation : null;

        const requestUrl = imgApiUrl + location.innerHTML + '-' + dest.innerHTML+ '&client_id=' + apiKey;
        //eventlistener
        window.addEventListener('change', updateImg())

        //calling fetchImg function and update the img
        async function updateImg() {
            await fetchImg(requestUrl)
                newImg.src = updatedImg;
                newImg.classList.add('new-image')
            }
        
        // update description    
        updatedDescription? description.innerText = updatedDescription : null; 
        
    }    
}

// fetch image 
async function fetchImg(url){
    await fetch(url)
    .then(response => {
        console.log(url)
        return response.json();   
    })
    .then(data => {
        updatedImg = data.results[0]? data.results[0].urls.regular : defaultImage;
        console.log(updatedImg)  
    })     
}
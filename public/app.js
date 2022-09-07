const form = document.querySelector('form')
let editButton = document.querySelectorAll("#edit-button")
let deleteButton = document.querySelectorAll("#delete-button")
let gifButton = document.querySelectorAll("#gif-button")
const messageDiv = document.querySelector('#message')


//Eventlistener for creating place 
form.addEventListener("submit", addPlace);

//functions 

//create list 
async function addPlace(event) {
      
    event.preventDefault();
    console.log("hit")

    const destInput = document.getElementsByName('destination')[0]    
    const destination = destInput.value
    const location = document.getElementsByName('location')[0].value
    const description = document.getElementsByName('description')[0].value    

    await fetch('/place', {
        
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            destination: destination,
            location: location,
            description: description, 
            image:''
                     
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            console.log("we are here ")
            window.location = window.location.href;
        })
}

// update list
async function editPlace(id, destination, location, description){

    console.log(id, location, destination, description)
    //window prompts
    let updatedDest = window.prompt("Enter new Destination");
    let updatedLocation = window.prompt("Enter new Location");
    let updatedDescription = window.prompt("Enter new description"); 

    updatedDest = updatedDest? updatedDest : destination;
    updatedLocation = updatedLocation? updatedLocation :location;
    updatedDescription = updatedDescription? updatedDescription : description

    const url = "/place/" + id 

    await fetch(url, {        
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            destination: updatedDest,
            location: updatedLocation,
            description: updatedDescription, 
            img: "image"         
        })        
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            console.log(response)
            window.location.reload(true)
        })
    }

//delete list 
function deletePlace(id){

    const url = "/place/" + id
    
    fetch(url, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: id,
        })
        
    })
    .then(res => {
        if(res.ok) return res
    })
    .then(response => {
        if( response === 'No place to delete') {
            messageDiv.textContent = "no Japane to delete"
        }else {
        console.log(response)
        window.location.reload()
        }
    })
    .catch()
}

// add gif (update image)
async function addGif(id,dest,loc, desc){

    const url = "/place/" + id
    
    await fetch(url, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            destination: dest,
            location: loc,
            description: desc, 
            img: "gify"      
        })        
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        console.log(response)
        window.location.reload(true)
    })   
}




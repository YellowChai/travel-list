const form = document.querySelector('form')
let editButton = document.querySelectorAll("#edit-button")
let deleteButton = document.querySelectorAll("#delete-button")
let gifButton = document.querySelectorAll("#gif-button")
const messageDiv = document.querySelector('#message')

//event listners

form.addEventListener("submit", addPlace);

// editButton.forEach(btn => btn.addEventListener("click", (e) => {

//     editPlace(e)
// }))
// deleteButton.forEach(btn => btn.addEventListener("click", (e) => {
    
//     deletePlace(e)
// }))
// gifButton.forEach(btn => btn.addEventListener("click", (e) => {
    
//     addGif(e)
// }))



//functions 

//create list 
async function addPlace(event) {
      
    event.preventDefault();
    console.log("hit")
    //Create img with API img
    const destInput = document.getElementsByName('destination')[0]    
    const destination = destInput.value
    const location = document.getElementsByName('location')[0].value
    const description = document.getElementsByName('description')[0].value    

    await fetch('/', {
        
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            destination: destination,
            location: location,
            description: description, 
                     
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

    const url = "/" + id + "/wishlist/edit"

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

    const url = "/" + id + "/wishlist/delete"
    
    fetch(url, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: id,
        })
        
    })
    .then(res => {
        if(res.ok) return res.json()
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

    const url = "/" + id+ "/wishlist/edit"
    
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


// //     var textContent = document.createTextNode('Hi! I am a modal popup created by pure javascript');
// //     gifDiv.appendChild(textContent);
// //     var newcloseButton= document.createElement('button');
// //     var newContent = document.createTextNode('X');
// //     newcloseButton.appendChild(newContent);
// //     newcloseButton.id='btn';
// //     // gifDiv.setAttribute('style', 'border:3px solid;height: 150px; width: 380px; top: 741px; left: 491px; padding:10px; margin: 50px;background:red; text-align: center;vertical-align: middle;line-height: 140px;');
// //     newcloseButton.setAttribute('style', 'border :1px solid; height: 15px; width:20px; top: 6px; left: 4px; float: right; margin: 0px; padding:0px; clear: both; float:right;font-size:11px;');

// //     gifDiv.appendChild(newcloseButton);
// //     travelList.appendChild(gifDiv).appendChild(newcloseButton);

// //     newcloseButton.onclick = function remove(btn)
// //     {
// //     gifDiv.parentElement.removeChild(gifDiv);
// //     }

// // }



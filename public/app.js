// require('dotenv').config();
const form = document.querySelector('form')
let editButton = document.querySelectorAll("#edit-button")
let deleteButton = document.querySelectorAll("#delete-button")
let gifButton = document.querySelectorAll("#gif-button")
const messageDiv = document.querySelector('#message')

// let apiKey= process.env.API_KEY;
// const imgApiUrl = "https://api.unsplash.com/search/photos?query="

// const destination = document.getElementsByName('destination')[0].value
// const location = document.getElementsByName('location')[0].value
// const description = document.getElementsByName('description')[0].value
// let updatedImg 


editButton.forEach(btn => btn.addEventListener("click", (e) => {
    
    editPlace(e)
}))
deleteButton.forEach(btn => btn.addEventListener("click", (e) => {
    
    deletePlace(e)
}))
gifButton.forEach(btn => btn.addEventListener("click", (e) => {
    
    addGif(e)
}))

// editButton.addEventListener('click', editPlace)

async function editPlace(e){
    const item = e.target
    const list = item.parentElement.parentElement
    const dest = list.querySelector(".dest")
    

    //window prompts
    const updatedDest = window.prompt("Enter new Destination");
    const updatedLocation = window.prompt("Enter new Location");
    const updatedDescription = window.prompt("Enter new description"); 

    console.log(updatedDest)

    const url = "/" + dest.innerText + "/wishlist/edit"
    console.log(url)
    console.log(dest.innerText)
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

function deletePlace(e){
    const item = e.target
    const list = item.parentElement.parentElement
    const dest = list.querySelector(".dest")
    const url = "/" + dest.innerText + "/wishlist/delete"
    
    fetch(url, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            destination: 'Japan',
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

// Event Listeners
form.addEventListener("submit", addPlace);

//functions 
async function addPlace(event) {
      
    event.preventDefault();
    console.log("hit")
    //Create img with API img
    const destInput = document.getElementsByName('destination')[0]
    
    const destination = destInput.value
    const location = document.getElementsByName('location')[0].value
    const description = document.getElementsByName('description')[0].value    

    await fetch('/wishList', {
        
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            destination: destination,
            location: location,
            description: description, 
            img: 'image'           
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

   



async function addGif(e){
    const item = e.target;
    console.log('clicked')
    const list = item.parentElement.parentElement;    
    const dest = list.querySelector(".dest");
    const loc = list.querySelector(".location")
    const desc = list.querySelector(".description")
    const url = "/" + dest.innerText + "/wishlist/edit"
    
    const destData = dest.innerText
    const locData = loc.innerText
    const desData = desc.innerText
    await fetch(url, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            destination: destData,
            location: locData,
            description: desData, 
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


// //fetch Giphy based on the location in the list 
// async function fetchGif(location){
    
//     console.log(location)
//     const requestUrl = "https://api.giphy.com/v1/gifs/search?q=" + location + "&api_key=mA2K39iuyksOKsneLEI9WmxkHyTFfdcf&limit=6"

//     try{
//         let response = await fetch(requestUrl);
//         let data = await response.json();
//         console.log(requestUrl)
//         console.log(data.data[0].images.original.url)
//         updatedImg = data.data[0].images.original.url;
//         console.log(updatedImg)

//     }catch(err) {
//         alert(err)
//     }
// }


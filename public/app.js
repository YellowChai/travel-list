
const form = document.querySelector('form')
let editButton = document.querySelectorAll("#edit-button")
let deleteButton = document.querySelectorAll("#delete-button")
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
// editButton.addEventListener('click', editPlace)

async function editPlace(e){
    const item = e.target
    const list = item.parentElement.parentElement
    const dest = list.querySelector(".dest")
    

    //window prompts
    const updatedDest = window.prompt("Enter new Destination");
    const updatedLocation = window.prompt("Enter new Location");
    const updatedDescription = window.prompt("Enter new description"); 
    
    //Create img with API img
    // const requestUrl = imgApiUrl + updatedDest+ '-' + updatedLocation+ '&client_id=' + apiKey;
    console.log(updatedDest)
    // const newImg = document.createElement('img');

    // await fetchImg(requestUrl);
    // newImg.src = updatedImg;


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
            // img: newImg.src
            
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

    //Create img with API img
    
    const destination = document.getElementsByName('destination')[0].value
    const location = document.getElementsByName('location')[0].value
    const description = document.getElementsByName('description')[0].value
 
    // const requestUrl = imgApiUrl + destination+ '-' + location+ '&client_id=' + apiKey;
    // console.log(requestUrl)
    // const newImg = document.createElement('img');
    const place = document.querySelector('.place')
    // await fetchImg(requestUrl);
    // newImg.src = updatedImg;
    
    
    await fetch('/wishList', {
        
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            destination: destination,
            location: location,
            description: description,
            // img: newImg.src
            
        })
    })
    
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response => {
            console.log(response)
            // window.location.reload(true)
        })
    

    

            //create lists for edit and delete button
    const btnList = document.querySelector('btn-list')
 

        const editButton = document.createElement('button');
        editButton.innerText = "Edit";
        editButton.classList.add("edit-button");
        btnList.appendChild(editButton)
        editButton.addEventListener("click", editPlace);
        


    //gif Button
    // const gifButton = document.createElement('button');
    // gifButton.innerText = "GIF";
    // gifButton.classList.add("gif-button"); 
    // buttonList.appendChild(gifButton)
    // gifButton.addEventListener("click", addGif);

    //Append to list
    // placeDiv.appendChild(newDest);
    // placeDiv.appendChild(newPlace);
    // placeDiv.appendChild(newDescription);
    document.querySelector('.img').appendChild(newImg);
    form.reset()
}


// async function addGif(e){
//     const item = e.target;
//     console.log('clicked')
//     const list = item.parentElement.parentElement;    
//     const location = list.querySelector('.new-place').innerHTML
//     const img = list.querySelector(".new-image");

//     await fetchGif(location)
//     img.src = updatedImg;
// }


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


// // fetch image 
// async function fetchImg(url){
    
//     const defaultImage ="https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg";

//     try{
//         let response = await fetch(url);
//         let data = await response.json();
//         console.log(url)
//         console.log(data.results[0].urls.regular)
//         updatedImg = data.results[0]? data.results[0].urls.regular : defaultImage;
//         console.log(updatedImg)    
//     }catch(err) {
//         alert(err)
//     }
// }// // fetch image 
// async function fetchImg(url){
    
//     const defaultImage ="https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg";

//     try{
//         let response = await fetch(url);
//         let data = await response.json();
//         console.log(url)
//         console.log(data.results[0].urls.regular)
//         updatedImg = data.results[0]? data.results[0].urls.regular : defaultImage;
//         console.log(updatedImg)    
//     }catch(err) {
//         alert(err)
//     }
// }// // fetch image 
// async function fetchImg(url){
    
//     const defaultImage ="https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg";

//     try{
//         let response = await fetch(url);
//         let data = await response.json();
//         console.log(url)
//         console.log(data.results[0].urls.regular)
//         updatedImg = data.results[0]? data.results[0].urls.regular : defaultImage;
//         console.log(updatedImg)    
//     }catch(err) {
//         alert(err)
//     }
// }// // fetch image 
// async function fetchImg(url){
    
//     const defaultImage ="https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg";

//     try{
//         let response = await fetch(url);
//         let data = await response.json();
//         console.log(url)
//         console.log(data.results[0].urls.regular)
//         updatedImg = data.results[0]? data.results[0].urls.regular : defaultImage;
//         console.log(updatedImg)    
//     }catch(err) {
//         alert(err)
//     }
// }

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


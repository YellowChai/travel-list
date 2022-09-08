require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require('axios')
const db = require("../../models");

let imgApiKey= process.env.API_KEY;
let gifApiKey=process.env.GIPHY_API_KEY;
const imgApiUrl = "https://api.unsplash.com/search/photos?query="
const giphyApiUrl = "https://api.giphy.com/v1/gifs/search?q="
let data;
let updatedImg;

//testing
router.get("/test", (req, res) =>
{
    console.log("hit")
    res.json({msg: "place endpoint testing"});
});


// get route
router.get('/', async (req,res) => {

    db.Place.find().exec()   
    .then(foundPlace => {
            res.render('index', {place : foundPlace})
    })    
    .catch(err => {
        console.log(err)
        res.status.apply(503).send({message: 'Database error'})
    })
})

//post route 
router.post('/', async(req, res) =>{
   
    const url = imgApiUrl + req.body.destination+ '-' + req.body.location+ '&client_id=' + imgApiKey;
    await fetchImg(url)
    updatedImg = (data) ? data.results[0].urls.regular : defaultImage   
    req.body.image = updatedImg
    db.Place.create(req.body)
   .then(createdPost => {
        res.status(201).send(createdPost)
    })
    .catch(err => {
        console.log("create error", err)
    })
    })


router.put('/:id', async (req, res) => {
    let unsplashUrl = imgApiUrl + req.body.destination+ '-' + req.body.location+ '&client_id=' + imgApiKey;
    let gifUrl = giphyApiUrl + req.body.destination + "&api_key=" + gifApiKey
    const defaultImage ="https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg";
    console.log("printing here", req.body.img.toString())
    
    if (req.body.img == "image"){
        await fetchImg(unsplashUrl)
        console.log(data.results[0].urls.regular)
        updatedImg = (data) ? data.results[0].urls.regular : defaultImage
    }else {
        await fetchImg(gifUrl)
        updatedImg = (data) ? data.data[0].images.original.url : defaultImage
    }
    console.log("check", updatedImg)
    req.body.image = updatedImg
    db.Place.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        req.body,
        {
            new: true
        })
        .then(updatedPlace => {
            res.send(updatedPlace)
            console.log(updatedPlace)
        })
        .catch(err => {
            console.log(err)
            res.status(503).send({message: 'server error'})
        })
})    

router.delete('/:id', async(req, res) => {
    db.Place.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(204).send()
    })
    .catch(err=>{
        console.log(err)
        res.status(503).send({message: 'coudlnt find the place'})
    })
})


// fetch image 
async function fetchImg(url){
    
    await axios.get(url)
    .then(response => {
        data = response.data 
    }).catch(err => {
        console.log(err)
    })
}



module.exports = router;


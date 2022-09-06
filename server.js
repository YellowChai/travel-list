require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
const port = process.env.PORT || 3000
const host = '0.0.0.0'
const ObjectId = require('mongodb').ObjectId

let imgApiKey= process.env.API_KEY;
let gifApiKey=process.env.GIPHY_API_KEY;
let db = process.env.DB;

let updatedImg;
let data;
const imgApiUrl = "https://api.unsplash.com/search/photos?query="
const giphyApiUrl = "https://api.giphy.com/v1/gifs/search?q="


const MongoClient = require('mongodb').MongoClient

MongoClient.connect(db)
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('travel-wishlist')
        const placeCollection = db.collection('place')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        app.set('view engine', 'ejs')

        // get 
        app.get('/', (req, res) => {
            db.collection('place').find().toArray()
            .then(results => {                
                res.render('index.ejs', {place: results})
            })
            .catch(error => console.error(error))
            
        })

        //post 
        app.post('/', async (req, res) => {
            console.log(req.body)
            const url = imgApiUrl + req.body.destination+ '-' + req.body.location+ '&client_id=' + imgApiKey;
            
            await fetchImg(url)
            updatedImg = (data) ? data.results[0].urls.regular : defaultImage
           
            placeCollection.insertOne({                
                destination: req.body.destination,
                location: req.body.location,
                description: req.body.description,
                img: updatedImg
            },)
            .then(result => {
                // res.redirect('/')
                res.json('server hit')
            })
            .catch(error => console.error(error))
        })


        // put
        app.put('/:id/wishlist/edit', async (req, res) => {           
            let id = ObjectId(req.params.id)
            let unsplashUrl = imgApiUrl + req.body.destination+ '-' + req.body.location+ '&client_id=' + imgApiKey;
            let gifUrl = giphyApiUrl + req.body.destination + "&api_key=" + gifApiKey
            const defaultImage ="https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg";
            console.log("printing here", req.body.img.toString())
            await fetchImg()
            if (req.body.img == "image"){
                await fetchImg(unsplashUrl)
                console.log(data.results[0].urls.regular)
                updatedImg = (data) ? data.results[0].urls.regular : defaultImage
            }else {
                await fetchImg(gifUrl)
                updatedImg = (data) ? data.data[0].images.original.url : defaultImage
            }
            console.log("check", updatedImg)

            await placeCollection.findOneAndUpdate(
                { _id: id},
                {
                    $set: {                        
                        destination: req.body.destination,
                        location: req.body.location,
                        description: req.body.description,
                        img: updatedImg
                    }
                },
            )
            .then(result =>{
                res.json('Edit Success')
                console.log(req.body)
            })
            .catch(error => console.error(error))
        })
        
        //delete
        app.delete('/:id/wishlist/delete', (req, res) => {
            let id = ObjectId(req.params.id)
            placeCollection.deleteOne(
                { _id: id},
                // no need to change any options, so omit options
            )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No place to delete')
                }
                res.json('Deleted')
            })
            .catch(error => console.error(error))
        })

        app.listen(port, host, function() {
            console.log('listening')
        })
            
    })
    .catch(error => console.error(error))

// fetch image 
async function fetchImg(url){
    
    await axios.get(url)
    .then(response => {
        data = response.data 
    }).catch(err => {
        console.log(err)
    })
}


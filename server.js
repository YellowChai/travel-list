const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
require('dotenv').config();

let apiKey= process.env.API_KEY;
const imgApiUrl = "https://api.unsplash.com/search/photos?query="
let updatedImg;


const MongoClient = require('mongodb').MongoClient

MongoClient.connect("mongodb+srv://aklee213:Ayala!%4006@cluster0.z8twpwf.mongodb.net/?retryWrites=true&w=majority")
    .then(client => {
        console.log('Connected to Database')
        const db = client.db('travel-wishlist')
        const placeCollection = db.collection('place')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())
        app.use(express.static('public'))

        console.log('server connected')

        app.set('view engine', 'ejs')
        // res.render(view, locals)

        app.get('/', (req, res) => {
            db.collection('place').find().toArray()
            .then(results => {                
                res.render('index.ejs', {place: results})
            })
            .catch(error => console.error(error))
            
        })

        app.post('/wishlist', async (req, res) => {
            console.log(req.body)
            const url = imgApiUrl + req.body.destination+ '-' + req.body.location+ '&client_id=' + apiKey;
            await fetchImg(url)
            placeCollection.insertOne({                
                destination: req.body.destination,
                location: req.body.location,
                description: req.body.description,
                img: updatedImg
            })
            .then(result => {
                res.redirect('/')
                console.log(req.body)
            })
            .catch(error => console.error(error))
        })

        app.put('/:id/wishlist/edit', async (req, res) => {
            console.log(req.params.id)
            const url = imgApiUrl + req.body.destination+ '-' + req.body.location+ '&client_id=' + apiKey;
            await fetchImg(url)
            placeCollection.findOneAndUpdate(
                { destination: req.params.id },
                {
                    $set: {                        
                        destination: req.body.destination,
                        location: req.body.location,
                        description: req.body.description,
                        img: updatedImg
                    }
                },
                // options
                // options tells MongoDB to define additional options for this update request 
                {
                    // insert a document if no documents can be updated 
                    // upsert: true
                }
            )
            .then(result =>{
                res.json('Edit Success')
                console.log(req.body)
            })
            .catch(error => console.error(error))
        })

        app.delete('/:id/wishlist/delete', (req, res) => {
            placeCollection.deleteOne(
                { destination: req.params.id },
                // no need to change any options, so omit options
            )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No place to delete')
                }
                res.json('Deleted japan')
            })
            .catch(error => console.error(error))
        })

        app.listen(3000, function() {
            console.log('listening on 3000')
        })
            
    })
    .catch(error => console.error(error))

// // fetch image 
async function fetchImg(url){
    
    const defaultImage ="https://image.shutterstock.com/shutterstock/photos/1094945555/display_1500/stock-photo-blue-suitcase-with-sun-glasses-hat-and-camera-on-pastel-blue-background-travel-concept-minimal-1094945555.jpg";
    console.log(url)
   
        await axios.get(url)
        .then(response => {console.log(response.data.results[0])
        let data = response.data.results[0]
        updatedImg = data? data.urls.regular : defaultImage;
        console.log(updatedImg) 
    }).catch(err => {
        console.log(err)
    })
}

        
        // let data = await response.results[0]
        // console.log(url)
        // console.log(data.urls.regular)
        // updatedImg = data? data.urls.regular : defaultImage;
        // console.log(updatedImg)    



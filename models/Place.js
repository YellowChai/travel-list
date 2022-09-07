const mongoose = require('mongoose')
const Schema = mongoose.Schema

const placeSchema = new Schema({
    destination: { type : String, unique: true },
    location: String, 
    description: String,
    image: String
}); 

module.exports= Place = mongoose.model('Place', placeSchema);
require('dotenv').config();

const mongoose = require('mongoose')
let mongoDb = process.env.DB;

mongoose.connect(mongoDb, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;

db.once('open', _ => {
    console.log('Database connected')
})

db.on('error', err => {
    console.error('connection error', err)
});


module.exports.Place = require('./Place')


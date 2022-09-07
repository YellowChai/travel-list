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


// app.set('view engine', 'ejs')
module.exports.Place = require('./Place')

// const Place = require('./Place')

// async function addPlace() {
// const london = new Place({
//     destination: 'England',
//     location: 'London',
//     description: 'testing',
//     image:'https://images.unsplash.com/photo-1548115184-bc6544d06a58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTk2Mjh8MHwxfHNlYXJjaHwxfHxrb3JlYS1zZW91bHxlbnwwfHx8fDE2NjI0Nzk3MjE&ixlib=rb-1.2.1&q=80&w=1080'
// })
//     // await Place.deleteMany({})
//     const doc = await london.save()
    
//     console.log(doc)
// }

// // addPlace()
// //     .catch(error => { console.error(error)})
// console.log(Place)
// async function getPlace(){
// const test = await Place.find().exec()
// console.log(test)
// }

// getPlace()
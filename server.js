require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const port = process.env.PORT || 3000

const places = require("./routes/api/places");
const host = '0.0.0.0'


//MIDDLEWARE
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs');



//ROUTES
app.get("/", (req, res) =>
{    
    res.status(200).json({message: " You\'re being watched by the Backend Team"});
});

app.use("/place", places);

app.listen(port, () =>
{
    console.log('Server is running on port')
});






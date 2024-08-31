const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Create a MongoDB connection string
const connectionString = "mongodb+srv://navneetkumar:admin@cluster0.tzkcmty.mongodb.net/mydb";

// Use the Mongoose connect() method to connect to the MongoDB database
mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected"))
    .catch(console.error);

const Books = require('./models/Books')


app.get('/books', async (req, res) => {
    
    const books = await Books.find().select(['name' ,'author','bookimg']);
    res.json(books);
})

app.get('/books/:tag', async (req, res) => {
    
    const books = await Books.find({ tag: req.params.tag }).select(['name' ,'author', 'bookimg']);;
    res.json(books);
})

app.get('/book/:name', async (req, res) => {

    const book = await Books.find({ name: req.params.name })
    res.json(book);
    
})

app.get('/search/:q', async (req, res) => {
    const query = await Books.find({name : {
        '$regex': req.params.q, 
        '$options': 'i'
    }
    }).select(['name' ,'author']);
    res.json(query)
})


// Start your Express JS application
app.listen(3001, () => {
    console.log("App listening on port 3001");
});

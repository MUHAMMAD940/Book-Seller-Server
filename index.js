const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require("mongodb").ObjectId
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})


const uri = "mongodb+srv://bookReader00:AHU80PVo9W4E5dDb@cluster0.xzdow.mongodb.net/bookSeller?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const productCollection = client.db("bookSeller").collection("events");
  app.post('/addProduct', (req, res) => {
            const newProduct = req.body;
            productCollection.insertOne(newProduct)
            .then(result => {
                res.send(result.insertedCount > 0)
            })
        })
        app.get("/getProducts", (req, res) => {
                    productCollection.find({}).toArray((error, docs) => {
                        res.send(docs)
                    })
                })
            
                app.delete("/delete/:id", (req, res) => {
                    productCollection
                        .deleteOne({ _id: ObjectId(req.params.id) })
                        .then((result) => {
                            res.send(result.deletedCount > 0)
                        })
                })
});





app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
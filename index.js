const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const app = express();
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

const port =process.env.PORT || 5000;

// middleWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gfvdc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
           const database = client.db("packege");
        const packegeCollection = database.collection("allPackege");
        const bookingCollection = database.collection("allBooking")
        const blogCollection = database.collection("allBlog")

        //    post packege api

        app.post('/packege', async (req, res) => {
            const data = req.body;
            const result = await packegeCollection.insertOne(data);
            res.json(result);
        })

        //  get packege api

        app.get('/packege', async (req, res) => {
            const cursor = packegeCollection.find({});
            const data = await cursor.toArray();
            res.send(
                data
            );
        })

        

        // get singel packeg

        app.get('/singlepackege/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await packegeCollection.findOne(query);
            res.send(result);
        })

        //post register api
        app.post('/booking', async (req, res) => {
            const data = req.body;
            const result = await bookingCollection.insertOne(data);
            res.json(result);
        })

         //  get register api

         app.get('/booking', async (req, res) => {
            const cursor = bookingCollection.find({});
            const data = await cursor.toArray();
            res.send(
                data
            );
        })

        // update status
        app.put('/status/:id', async(req, res)=>{
            const id = req.params.id;
            const booking = {_id: ObjectId(id)};
            const updateStatus = {
                $set: {
                    status : "Approved",
                    color : "#2E8B57"
                }
            }
            const result = await bookingCollection.updateOne(booking, updateStatus);
            res.send(result);
        })

        // delete booking
        app.delete('/deletebooking/:id', async(req,res)=>{
            const id = req.params.id;
            const booking = {_id: ObjectId(id)};
            const result = await bookingCollection.deleteOne(booking);
            res.send(result);
        })

        //  get singel regester api
        app.get('/booking/:emailId', async (req, res) => {
            const emailId = req.params.emailId;
            const query = { email: emailId };
            const getData = bookingCollection.find(query);
            const result = await getData.toArray();
            res.send(result);
        })

        //    post blogs api

        app.post('/blogs', async (req, res) => {
            const data = req.body;
            const result = await blogCollection.insertOne(data);
            res.json(result);
        })


        //  get blogs api

        app.get('/blogs', async (req, res) => {
            const cursor = blogCollection.find({});
            const data = await cursor.toArray();
            res.send(
                data
            );
        })

    }
    finally {
        //   await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
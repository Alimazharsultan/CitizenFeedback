const express = require('express')
const { applicationPort } = require('./config/default.json')
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const Complaint = require('./models/complaint')
const connectDB = require('./config/db')

const corsOptions = {
    origin: 'http://localhost:5173' // replace with your own origin
};

const app = express()
app.use(bodyParser.json());
app.use(cors(corsOptions))

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);


const dbName = 'local';

connectDB();
async function getData() {
    let result = await client.connect();
    let db = result.db(dbName)
    let collection = db.collection('startup_log');
    let r = await collection.find({}).toArray()
    console.log(r);
}

// getData();

app.get("/getComplaint/:id", async (req, res) => {

    try {

        const blockNo = req.params.id;
        let complaint = await Complaint.findOne({
            blockNo,
        })
        res.send(complaint)
    } catch (e) {
        res.send({})
    }
})

app.put("/editComplaint/:id", async (req, res) => {
    const { id } = req.params
    const { blockNo, userName, description } = req.body;

    try {
        const update = await Complaint.findOneAndUpdate(
            { blockNo: id }, {
            userName,
            description

        })


        res.send(update)
    } catch (e) {
        res.send(e)
    }
})


app.post("/createComplaint", async (req, res) => {

    try {

        const { blockNo, userName, description } = req.body;

        const complaint = new Complaint({
            blockNo,
            userName,
            description

        })

        await complaint.save()
        res.sendStatus(201)
    } catch (err) {
        res.status(400).send(err)
    }
})




app.listen(applicationPort, () => {
    console.log(`Server started on Port ${applicationPort}`)
}) 
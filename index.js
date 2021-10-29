const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qzbsy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      //console.log('db connected');

      const database = client.db('unwindDB');
      const serviceCollection = database.collection('serviceCollection');

      app.post('/services', async(req,res) => {
       const service = req.body;
       console.log('data posted',service);
       
          const result = await serviceCollection.insertOne(service);
           console.log(result);
        res.json(result);
      })
    } finally {
      //await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req,res) => {
    res.send('Running on server');
})

app.listen(port, () => {
    console.log('Running on port ', port);
})
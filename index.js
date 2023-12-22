const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
app.use(cors())
app.use(express.json());
//japtasekph
// tzKrzXEDbCKRtV22


const uri = "mongodb+srv://japtasekph:tzKrzXEDbCKRtV22@cluster0.wgy9amh.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   const taskcollection =client.db('japtasekph').collection('usertask')

   app.post('/task',async(req,res)=>{
    const data = req.body
    const taskingPostData =await taskcollection.insertOne(data)
    res.send(taskingPostData)
   })
   app.get('/task',async(req,res)=>{
   const email = req.query.email
   const qury = {email:email}
    const taskingPostData =await taskcollection.find(qury).toArray()
    res.send(taskingPostData)
   })
   app.delete('/task/:id',async(req,res)=>{
   const id = req.params.id
   const qury = {_id:new ObjectId(id)}
    const taskingPostData =await taskcollection.deleteOne(qury)
    res.send(taskingPostData)
   })
   app.get('/task/:id',async(req,res)=>{
   const id = req.params.id
   const qury = {_id:new ObjectId(id)}
    const taskingPostData =await taskcollection.findOne(qury)
    res.send(taskingPostData)
   })
   app.patch('/task/:id',async(req,res)=>{
   const id = req.params.id
   const body = req.body
   const qury = {_id:new ObjectId(id)}
    
   
   const found = {
    $set:{
      ...body
    }
   }
    const taskingPostData =await taskcollection.updateOne(qury,found)
    res.send(taskingPostData)
   })
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send('Browsers is ranning')
})

app.listen(port)
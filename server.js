require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const playersRouter = require('./routes/playersRoutes');

const cors = require('cors');


const app = express();

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.DATABASE_URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(e) {
    console.error(e.message)
  }
}
run().catch(console.dir);

app.use(express.json(),cors())

app.use('/players', playersRouter)

app.listen(3000, () => console.info("=== SERVER STARTED ==="))
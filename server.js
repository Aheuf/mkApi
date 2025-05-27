require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const playersRouter = require('./routes/playersRoutes');
const cors = require('cors');
const http = require('http');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/players', playersRouter)

const server = http.createServer(app);
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(e) {
    console.error(e.message)
  }
}
run().catch(console.dir);


require('./websocket')(server);

server.listen(3000, () => console.info("=== SERVER STARTED ==="))
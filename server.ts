require('dotenv').config();
import mongoose from "mongoose";
import express from "express";
import playersRouter from './routes/playersRoutes';
import cors from 'cors';
import http from 'http';
import { ServerApiVersion } from "mongodb";
import playerService from "./services/PlayerService";

const app = express();
const server = http.createServer(express);
const clientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
};

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    if(process.env.DATABASE_URL && mongoose.connection.db){
      await mongoose.connect(process.env.DATABASE_URL, clientOptions);
      console.info("You successfully connected to MongoDB!");
    } else {
      throw new Error("Failed to connected to MongoDB!");
    }
  } catch(e) {
    throw new Error(e);
  }
}

run().catch(console.dir);

app.use(express.json(),cors());

app.use('/players', playersRouter(playerService));
require('./websocket')(server);

server.listen(3000, () => console.info("=== SERVER STARTED ==="));
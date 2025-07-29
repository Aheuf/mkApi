import dotenv from 'dotenv';
import mongoose from "mongoose";
import express from "express";
import playersRouter from './routes/playersRoutes.js';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import http from 'http';
import { ServerApiVersion } from "mongodb";
import playerService from "./services/PlayerService/index.js";
import websocket from "./websocket.js";

dotenv.config();

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
     if(e instanceof Error) throw e;
      throw new Error('erreur de connexion au serveur');
  }
}

run().catch(console.dir);

app.use(express.json(),cors());

app.use('/players', playersRouter(playerService));
app.use('/', authRouter(playerService));

websocket(server);

server.listen(3000, () => console.info("=== SERVER STARTED ==="));
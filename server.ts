import dotenv from 'dotenv';
import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import playersRouter from './routes/playersRoutes.js';
import authRouter from './routes/authRoutes.js';
import cors from 'cors';
import http from 'http';
import { ServerApiVersion } from "mongodb";
import playerService from "./services/PlayerService/index.js";
import websocket from "./websocket.js";
import { NotFoundError, UnauthorizedError } from './errors/index.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
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
    if(process.env.DATABASE_URL){
      await mongoose.connect(process.env.DATABASE_URL, clientOptions);
      if(mongoose.connection.db){
        console.info("You successfully connected to MongoDB!");
      } else {
        throw new Error("Failed to connected to MongoDB!");
      }
    } else {
      throw new Error("No URL provided for MongoDB connection");
    }
  } catch(e) {
     if(e instanceof Error) throw e;
      throw new Error('erreur de connexion au serveur');
  }
}

run().catch(console.dir);

app.use(express.json());
app.use(cors());
app.use('/players', playersRouter(playerService));
app.use(authRouter(playerService));
app.use(errorHandler);

websocket(server);

server.listen(3000, () => console.info("=== SERVER STARTED ==="));

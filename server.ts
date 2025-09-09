import dotenv from 'dotenv';
import mongoose from "mongoose";
import express from "express";
import authRouter from './routes/authRoutes';
import cors from 'cors';
import http from 'http';
import { ServerApiVersion } from "mongodb";
import playerService from "./services/PlayerService";
import websocket from "./websocket";
import { errorHandler } from './middleware/errorHandler';
import playersRouter from 'routes/playersRoutes';
import cookieParser from 'cookie-parser';

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
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173", "https://mk.grosbi.de"], credentials: true }));
app.use('/players', playersRouter(playerService));
app.use(authRouter(playerService));
app.use(errorHandler);

websocket(server);

server.listen(3000, () => console.info("=== SERVER STARTED ==="));

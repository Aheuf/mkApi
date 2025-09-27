import express from "express";
import request from 'supertest';
import { newStubedPlayer, stubedPlayers } from '../../models/__stubs__/player.stub.js';
import authRouter from '../authRoutes.js';
import { errorHandler } from "../../middleware/errorHandler";
import { PlayerServiceImpl } from "../../services/PlayerService/PlayerServiceImpl.js";
import cookieParser from "cookie-parser";
import player from "../../models/player.js";
import { hashPassword } from "../../middleware/utils.js";
import Mockingoose from "mockingoose/types";
const mockingoose: typeof Mockingoose = require("mockingoose");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRouter(new PlayerServiceImpl(), new Set()));
app.use(errorHandler);

describe("auth routing tests", () => {
  beforeAll(() => {
    process.env.TOKEN_SECRET = "TOKEN_SECRET_STUB";
    mockingoose.resetAll();
  });

  it('POST /login avec aucun body retourne une erreur', async () => {
      // act
      const res = await request(app)
        .post(`/login`)
        .send();

      // assert
      expect(res.statusCode).toBe(400);
  });

  it('POST /login avec query body retourne un joueur', async () => {
      // arrange
      const password = "test-password";
      const playerToGet = stubedPlayers[0];
      playerToGet.password = hashPassword(password);
      mockingoose(player).toReturn(playerToGet, "findOne");

      // act
      const res = await request(app)
        .post(`/login`)
        .send({
          username: playerToGet.username,
          password: password
        });

      // assert
      expect(res.statusCode).toBe(200);
      expect(res.body.username).toBe(playerToGet.username);
      expect(res.headers["set-cookie"][0]).toContain("jwt=");
  });

  it("POST /register avec query body retourne une 200", async () => {
      // arrange
      mockingoose(player).toReturn(null, "findOne");

      // act
      const res = await request(app)
        .post(`/register`)
        .send(newStubedPlayer);

      // assert
      expect(res.statusCode).toBe(200);
  });

  it("POST /register s'il y a déjà 12 joueurs m'enregistre en queued", async () => {
      // arrange
      mockingoose(player).toReturn(null, "findOne");

      // act
      const res = await request(app)
        .post(`/register`)
        .send(newStubedPlayer);

      // assert
      expect(res.statusCode).toBe(200);
  });

  it("POST /register avec username déjà pris retourne une erreur", async () => {
      // arrange
      mockingoose(player).toReturn(newStubedPlayer, "findOne");

      // act
      const res = await request(app)
        .post(`/register`)
        .send(newStubedPlayer);

      // assert
      expect(res.statusCode).toBe(400);
  });
});
import express from "express";
import playersRouter from "../playersRoutes";
import request from "supertest";
import { stubedPlayers } from "../../models/__stubs__/player.stub";
import { errorHandler } from "../../middleware/errorHandler";
import { PlayerServiceImpl } from "../../services/PlayerService/PlayerServiceImpl";
import player, { PlayerType } from "../../models/player";
import { ROLE } from "../../constants";
import { generateAccessToken } from "../../middleware/utils";
import cookieParser from "cookie-parser";
import Mockingoose from "mockingoose/types";
const mockingoose: typeof Mockingoose = require("mockingoose");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/players", playersRouter(new PlayerServiceImpl()));
app.use(errorHandler);

describe("player routing tests", () => {
  beforeAll(() => {
    process.env.TOKEN_SECRET = "TOKEN_SECRET_STUB";
  });

  beforeEach(() => {
    mockingoose.resetAll();
    mockingoose(player).toReturn(stubedPlayers, "find");
  });

  it("GET /players retourne 401 si pas authentifié", async () => {
    // arrange

    // act
    const res = await request(app).get("/players");

    // assert
    expect(res.statusCode).toBe(401);
  });

  it("GET /players retourne 403 si authentifié mais pas admin", async () => {
    // arrange
    const player = stubedPlayers.find(p => p.role === ROLE.PLAYER) as PlayerType;
    const agent = request.agent(app).set("Cookie", `jwt=${generateAccessToken(player.username, player.role)}`);

    // act
    const res = await agent.get("/players");

    // assert
    expect(res.statusCode).toBe(403);
  });

  it("GET /players retourne tous les joueurs", async () => {
    // arrange
    const admin = stubedPlayers.find(p => p.role === ROLE.ADMIN) as PlayerType;
    const agent = request.agent(app).set("Cookie", `jwt=${generateAccessToken(admin.username, admin.role)}`);

    // act
    const res = await agent.get("/players");

    // assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject(stubedPlayers);
  });

  it("PATCH /players/<username> met à jour les PV", async () => {
    // arrange
    const playerToUpdate = stubedPlayers.find(p => p.role === ROLE.PLAYER && p.pv === 3) as PlayerType;
    const agent = request.agent(app).set("Cookie", `jwt=${generateAccessToken(playerToUpdate.username, playerToUpdate.role)}`);
    playerToUpdate.pv = 2;
    mockingoose(player).toReturn(playerToUpdate, "findOneAndUpdate");

    // act
    const res = await agent.patch(`/players/${playerToUpdate.username}`).send(playerToUpdate);

    // assert
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /players/<mon_username> supprime mon compte", async () => {
    // arrange
    const player = stubedPlayers.find(p => p.role === ROLE.PLAYER) as PlayerType;
    const agent = request.agent(app).set("Cookie", `jwt=${generateAccessToken(player.username, player.role)}`);

    // act
    const res = await agent.delete(`/players/${player.username}`);

    // assert
    expect(res.statusCode).toBe(200);
  });

  it("DELETE /players/<autre_username> retourne une erreur si je ne suis pas admin", async () => {
    // arrange
    const player = stubedPlayers.find(p => p.role === ROLE.PLAYER) as PlayerType;
    const playerToDelete = stubedPlayers.find(p => p.username !== player.username) as PlayerType;
    const agent = request.agent(app).set("Cookie", `jwt=${generateAccessToken(player.username, player.role)}`);

    // act
    const res = await agent.delete(`/players/${playerToDelete.username}`);

    // assert
    expect(res.statusCode).toBe(403);
  });

  it("DELETE /players/<autre_username> supprime le compte si je suis ADMIN", async () => {
    // arrange
    const admin = stubedPlayers.find(p => p.role === ROLE.ADMIN) as PlayerType;
    const playerToDelete = stubedPlayers.find(p => p.role === ROLE.PLAYER) as PlayerType;
    const agent = request.agent(app).set("Cookie", `jwt=${generateAccessToken(admin.username, admin.role)}`);

    // act
    const res = await agent.delete(`/players/${playerToDelete.username}`);

    // assert
    expect(res.statusCode).toBe(200);
  });
});

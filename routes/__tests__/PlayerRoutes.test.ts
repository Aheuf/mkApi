import express from "express";
import playersRouter from "../playersRoutes.js";
import request from "supertest";
import { PlayerServiceMock } from "../../services/PlayerService/__mocks__/PlayerServiceMock.js";
import { stubedPlayers } from "../../models/__stubs__/player.stub.js";
import { errorHandler } from "../../middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/players", playersRouter(new PlayerServiceMock()));
app.use(errorHandler);

describe("player routing tests", () => {
  beforeAll(() => {
    process.env.TOKEN_SECRET = "TOKEN_SECRET_STUB";
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

    // act
    const res = await request(app).get("/players");

    // assert
    expect(res.statusCode).toBe(403);
  });

  it("GET /players retourne tous les joueurs", async () => {
    // arrange

    // act
    const res = await request(app).get("/players");

    // assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(stubedPlayers);
  });

  it("PATCH /players/update met à jour les PV", async () => {
    // arrange
    const playerToUpdate = stubedPlayers[2];

    // act
    const res = await request(app)
      .patch(`/players/update`)
      .send(playerToUpdate);

    // assert
    expect(res.statusCode).toBe(200);
    expect(res.body.pv).toBe(2);
  });

  xit("DELETE /players supprime un joueur", async () => {}); //TODO: implement delete player route tests
});

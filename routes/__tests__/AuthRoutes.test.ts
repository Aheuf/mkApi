import express from "express";
import request from 'supertest';
import { PlayerServiceMock } from '../../services/PlayerService/__mocks__/PlayerServiceMock.js';
import { newStubedPlayer, stubedPlayers } from '../../models/__stubs__/player.stub.js';
import authRouter from '../authRoutes.js';
import { errorHandler } from "../../middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(authRouter(new PlayerServiceMock()));
app.use(errorHandler);

describe("auth routing tests", () => {
  beforeAll(() => {
    process.env.TOKEN_SECRET = "TOKEN_SECRET_STUB";
  });

  it('POST /login avec query body retourne un joueur', async () => {
      // arrange
      const playerToGet = stubedPlayers[0];

      // act
      const res = await request(app)
        .post(`/login`)
        .send({
          username: playerToGet.username,
          password: playerToGet.password
        });

      // assert
      expect(res.statusCode).toBe(200);
      expect(res.body.nom).toBe(playerToGet.nom);
      expect(res.headers["set-cookie"][0]).toContain("authorization=");
  });

  it("GET /register avec query body retourne un joueur", async () => {

      // act
      const res = await request(app)
        .post(`/register`)
        .send(newStubedPlayer);

      // assert
      expect(res.statusCode).toBe(200);
  });
});
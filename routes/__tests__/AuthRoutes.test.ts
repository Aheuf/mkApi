import express from "express";
import request from 'supertest';
import { PlayerServiceMock } from '../../services/PlayerService/__mocks__/PlayerServiceMock.js';
import { stubedPlayers } from '../../models/__stubs__/player.stub.js';
import authRouter from '../authRoutes.js';


const app = express();

app.use(express.json());
app.use('/', authRouter(new PlayerServiceMock()));

describe("auth routing tests", () => {
  it('POST /login avec query body retourne un joueur', async () => {
      // arrange
      const playerToGet = stubedPlayers[0];

      // act
      const res = await request(app)
        .post(`/login`)
        .send({
          nom: playerToGet.nom,
          prenom: playerToGet.prenom,
          password: playerToGet.password
        });

      // assert
      expect(res.statusCode).toBe(200);
      expect(res.body.nom).toBe(playerToGet.nom);
  });

  xit("GET /register avec query body retourne un joueur", async () => {}) //TODO: Implement this test when the register endpoint is ready
});
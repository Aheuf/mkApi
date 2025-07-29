import express from "express";
import playersRouter from '../playersRoutes.js';
import request from 'supertest';
import { PlayerServiceMock } from '../../services/PlayerService/__mocks__/PlayerServiceMock.js';
import { stubedPlayers } from '../../models/__stubs__/player.stub.js';

const app = express();

app.use(express.json());
app.use('/players', playersRouter(new PlayerServiceMock()));

describe("player routing tests", () => {
    it('GET /players retourne tous les joueurs', async () => {
      // arrange

      // act
      const res = await request(app).get('/players');

      // assert
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(stubedPlayers);
  });

  it('PATCH /players/update met à jour les PV', async () => {
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
});
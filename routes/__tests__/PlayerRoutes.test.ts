import express from "express";
import playersRouter from '../playersRoutes';
import request from 'supertest';
import { stubedPlayers } from "../../models/__stubs__/player.stub";
import { PlayerServiceMock } from "../../services/PlayerService/__mocks__/PlayerServiceMock";

const app = express();

app.use(express.json());
app.use('/players', playersRouter(new PlayerServiceMock()));

describe("routing tests", () => {
    it('GET /players retourne tous les joueurs', async () => {
      // arrange

      // act
      const res = await request(app).get('/players');

      // assert
      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(stubedPlayers);
  });

  it('GET /players avec query params retourne un joueur', async () => {
      // arrange
      const playerToGet = stubedPlayers[0];

      // act
      const res = await request(app).get(`/players/player?nom=${playerToGet.nom}&prenom=${playerToGet.prenom}`);

      // assert
      expect(res.statusCode).toBe(200);
      expect(res.body.nom).toBe(playerToGet.nom);
  });

  it('PATCH /players/update met à jour les PV', async () => {
      // arrange
      const playerToUpdate = stubedPlayers[2];

      // act
      const res = await request(app)
        .patch(`/players/update?nom=${playerToUpdate.nom}&prenom=${playerToUpdate.prenom}`)
        .send({ pv: 2 });

      // assert
      expect(res.statusCode).toBe(200);
      expect(res.body.pv).toBe(2);
  });
});
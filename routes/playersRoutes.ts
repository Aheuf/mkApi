import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService";

const createPlayerRouter = (service: PlayerService) => {
  const router = Router();

  router.get('/', async (req,res) => {
    try {
      service.getAllPlayers().then(players => res.json(players));
    } catch (e){
      res.json({message: e.message});
    }
  });

  router.get('/player', async (req,res) => {
    try {
      service.getPlayerByName(String(req.query.nom), String(req.query.prenom)).then(player => res.json(player));
    } catch (e){
      res.json({message: e.message});
    }
  });

  router.patch('/update', async (req,res) => {
    try {
      res.json(await service.updatePlayerHp(String(req.query.nom), String(req.query.prenom), req.body.pv));
    } catch (e) {
      res.json({message: e.message});
    }
  });

  return router;
}

export default createPlayerRouter;

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

  router.get('/:nom/:prenom', async (req,res) => {
    try {
      service.getPlayerByName(req.params.nom, req.params.prenom).then(player => res.json(player));
    } catch (e){
      res.json({message: e.message});
    }
  });

  router.patch('/:nom/:prenom', async (req,res) => {
    try {
      res.json(await service.updatePlayerHp(req.params.nom, req.params.prenom, req.body.pv));
    } catch (e) {
      res.json({message: e.message});
    }
  });

  return router;
}

export default createPlayerRouter;

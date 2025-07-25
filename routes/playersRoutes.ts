import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService.js";

const createPlayerRouter = (service: PlayerService) => {
  const router = Router();

  router.get('/', async (req,res) => {
    try {
      res.json(await service.getAllPlayers());
    } catch (e){
      e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  });

  router.post('/login', async (req,res) => {
    try {
      res.json(await service.getPlayerByName(req.body.nom, req.body.prenom, req.body.password));
    } catch (e){
      e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  });

  router.patch('/update', async (req,res) => {
    try {
      res.json(await service.updatePlayerHp(req.body.player));
    } catch (e) {
      e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  });

  router.get('/count', async (req,res) => {
    try {
      service.getAllPlayers().then(players => res.json(players.length));
    } catch (e){
      e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  })

  return router;
}

export default createPlayerRouter;

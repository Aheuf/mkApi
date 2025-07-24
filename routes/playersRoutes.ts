import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService.js";

const createPlayerRouter = (service: PlayerService) => {
  const router = Router();

  router.get('/', async (req,res) => {
    try {
      service.getAllPlayers().then(players => res.json(players));
    } catch (e){
      e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  });

  router.get('/player', async (req,res) => {
    try {
      service.getPlayerByName(String(req.query.nom), String(req.query.prenom)).then(player => res.json(player));
    } catch (e){
      e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  });

  router.patch('/update', async (req,res) => {
    try {
      res.json(await service.updatePlayerHp(String(req.query.nom), String(req.query.prenom), req.body.pv));
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

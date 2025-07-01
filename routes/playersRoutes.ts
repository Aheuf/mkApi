import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService.js";
import { query, validationResult } from 'express-validator';

const createPlayerRouter = (service: PlayerService) => {
  const router = Router();

  router.get('/', async (req,res) => {
    try {
      service.getAllPlayers().then(players => res.json(players));
    } catch (e){
      e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  });

  router.get('/player', query("nom").notEmpty(), query("prenom").notEmpty(), async (req,res) => {
    try {
      const validationError = validationResult(req);

      if(validationError.isEmpty()){
        const player = await service.getPlayerByName(req.query!.nom, req.query!.prenom);

        res.json(player);
      } else {
        res.json({error: validationError.array()});
      }
    } catch (e){
      e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
    }
  });

  router.patch('/update', query("nom").notEmpty(), query("prenom").notEmpty(), async (req,res) => {
    try {
        const validationError = validationResult(req);

        if(validationError.isEmpty()){
          const updatedPlayer = await service.updatePlayerHp(req.query!.nom, req.query!.prenom, req.body.pv)

          res.json(updatedPlayer);
        } else {
          res.json({error: validationError.array()})
        }
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

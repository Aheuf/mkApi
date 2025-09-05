import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService.js";
import { authenticateToken } from "../middleware/utils.js";
import { NotFoundError, UnauthorizedError } from "../errors/index.js";

const playersRouter = (service: PlayerService) => {
  const router = Router();

  router.get('/', authenticateToken, async (req,res) => {
    res.json(await service.getAllPlayers(req.user!.role));
  });

  router.patch('/update', authenticateToken, async (req,res) => {
    res.json(await service.updatePlayerHp(req.user!.username, req.body.pv));
  });

  router.delete('/delete', authenticateToken, async (req,res) => {
    //   res.json(await service.deletePlayer(req.body.username, req.body.password));
  });

  return router;
}

export default playersRouter;

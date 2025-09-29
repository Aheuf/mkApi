import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService";
import { authenticateToken } from "../middleware/utils";
import { ROLE } from "../constants";
import { ForbiddenError } from "../errors";

const playersRouter = (service: PlayerService) => {
  const router = Router();

  router.get('/', authenticateToken, async (req,res) => {
    if (req.user!.role !== ROLE.ADMIN) throw new ForbiddenError();
    res.json(await service.getAllPlayers());
  });

  router.get('/me', authenticateToken, async (req, res) => {
    res.json(await service.getPlayer(req.user!.username));
  });

  router.delete('/:username', authenticateToken, async (req, res) => {
    if (req.user!.role !== ROLE.ADMIN && req.user!.username !== req.params.username) {
      throw new ForbiddenError();
    }
    res.json(await service.deletePlayer(req.params.username));
  });

  router.patch('/:username', authenticateToken, async (req,res) => {
    if (req.user!.role !== ROLE.ADMIN && req.user!.username !== req.params.username) {
      throw new ForbiddenError();
    }
    res.json(await service.updatePlayerHp(req.params.username, req.body.pv));
  });

  return router;
}

export default playersRouter;

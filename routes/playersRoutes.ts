import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService";
import { authenticateToken } from "../middleware/utils";
import { ROLE } from "../constants";
import { ForbiddenError } from "../errors";
import ServerSentEventClient, { ServerSentEventPayload, ServerSentEventType } from "../models/serverSentEventClient";

const playersRouter = (service: PlayerService, clients: Set<ServerSentEventClient>) => {
  const router = Router();

  router.get('/', authenticateToken, async (req, res) => {
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
    const payload: ServerSentEventPayload = { action: ServerSentEventType.DELETE, username: req.params.username };
    clients.forEach(client => {
      if (client.player.username !== req.user?.username && (client.player.role === ROLE.ADMIN || client.player.username === req.params.username)) {
        client.res.write(`data: ${JSON.stringify(payload)}\n\n`);
      }
    });
  });

  router.patch('/:username', authenticateToken, async (req, res) => {
    if (req.user!.role !== ROLE.ADMIN && req.user!.username !== req.params.username) {
      throw new ForbiddenError();
    }
    res.json(await service.updatePlayerHp(req.params.username, req.body.pv));

    const payload: ServerSentEventPayload = { action: ServerSentEventType.UPDATE, username: req.params.username, pv: req.body.pv };
    clients.forEach(client => {
      if (client.player.username !== req.user?.username && (client.player.role === ROLE.ADMIN || client.player.username === req.params.username)) {
        client.res.write(`data: ${JSON.stringify(payload)}\n\n`);
      }
    });
  });

  router.get("/events", authenticateToken, async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Cache-Control", "no-cache");
    res.flushHeaders();

    const me = {
      player: req.user!,
      res
    };

    clients.add(me);

    req.on("close", () => clients.delete(me));
  });

  return router;
}

export default playersRouter;

import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService";
import { log } from "console";

const createAuthRouter = (service: PlayerService) => {
    const router = Router();

    router.post('/login', async (req,res) => {
        try {
            res.json(await service.getPlayer(req.body.username, req.body.password));
        } catch (e){
            e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
        }
    });

    router.post("/register", async (req, res) => {
        try {
            await service.createPlayer(req.body);
            res.status(200).send();
        } catch (e){
            e instanceof Error ? res.status(500).json({ message: e.message }) : res.status(500).json({ message: 'Une erreur inconnue est survenue.' });
        }
    });

    return router;
}

export default createAuthRouter;
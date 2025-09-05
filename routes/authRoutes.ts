import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService";
import { generateAccessToken } from "../middleware/utils";

const createAuthRouter = (service: PlayerService) => {
    const router = Router();

    router.post('/login', async (req,res) => {
        const player = await service.getPlayer(req.body.username, req.body.password);
        const token = generateAccessToken(player.username, player.role);

        res.cookie("authorization", `Bearer ${token}`, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        res.json(player);
    });

    router.post("/register", async (req, res) => {
        await service.createPlayer(req.body);
        res.status(200).send();
    });

    router.post('/logout', (req,res) => {
        res.clearCookie("authorization");
        res.status(200).send();
    });

    return router;
}

export default createAuthRouter;
import { Router } from "express";
import { PlayerService } from "../services/PlayerService/PlayerService";
import { generateAccessToken } from "../middleware/utils";
import { WrongCredentialsError } from "../errors";
import bcrypt from "bcryptjs";
import { JWT_COOKIE_NAME, MAX_PLAYERS, REGISTRATION_STATUS } from "../constants";

const createAuthRouter = (service: PlayerService) => {
    const router = Router();

    router.post('/login', async (req,res) => {
        if (typeof req.body?.username !== "string" || typeof req.body?.password !== "string") {
            return res.status(400).send();
        }

        const player = await service.getPlayer(req.body.username);
        if (!player || !bcrypt.compareSync(req.body.password, player.password)) {
            throw new WrongCredentialsError();
        }

        const token = generateAccessToken(player.username, player.role);

        res.cookie(JWT_COOKIE_NAME, token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: "strict" });

        res.json({
            username: player.username,
            nom: player.nom,
            prenom: player.prenom,
            role: player.role,
            pv: player.pv
        });
    });

    router.post("/register", async (req, res) => {
        const role = await service.createPlayer(req.body);
        res.json({ role });
    });

    router.get("/registration_status", async (req, res) => {
        const playerCount = await service.getPlayerCount();
        playerCount >= MAX_PLAYERS ? res.json({ status: REGISTRATION_STATUS.FULL }) : res.json({ status: REGISTRATION_STATUS.OPEN });
    });

    router.post('/logout', (_req, res) => {
        res.clearCookie(JWT_COOKIE_NAME);
        res.status(200).send();
    });

    return router;
}

export default createAuthRouter;

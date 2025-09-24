import { Router } from "express";

const createHealthRouter = () => {
    const router = Router();

    router.post('/check', async (req,res) => {
        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        };
        try {
            res.send(healthcheck);
        } catch (e:any) {
            healthcheck.message = e.message;
            res.status(503).send();
        }
    });


    return router;
}

export default createHealthRouter;

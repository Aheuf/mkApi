import { ROLE } from '../../constants.js';
import { NotFoundError, UnauthorizedError } from '../../errors/index.js';
import { hashPassword } from '../../middleware/utils.js';
import Player, { NewPlayerPayload, PlayerType } from '../../models/player.js';
import { PlayerService } from './PlayerService.js';

export class PlayerServiceImpl implements PlayerService {
    MAX_PLAYERS = 12;

    async getAllPlayers(role: ROLE): Promise<PlayerType[]> {
        if (role !== ROLE.ADMIN) throw new UnauthorizedError();
        return await Player.find();
    }

    async getPlayer(username:string, password:string):Promise<PlayerType> {
        const userPassword = await hashPassword(password);
        const foundedPlayer = await Player.findOne({ username:username, password:userPassword }).exec();

        if (!foundedPlayer) throw new NotFoundError;

        return foundedPlayer;
    }

    async updatePlayerHp(username: string, pv: number):Promise<void>{
        const updatedPlayer = await Player.findOneAndUpdate(
            { username },
            { pv },
            { new: true }
        );

        if (!updatedPlayer) throw new NotFoundError;
    }

    async createPlayer(payload: NewPlayerPayload): Promise<void> {
        const newPlayer = new Player(payload);
        const playersLength = (await Player.where("role").equals(ROLE.PLAYER)).length;

        newPlayer.password = await hashPassword(payload.password);
        newPlayer.role = playersLength === this.MAX_PLAYERS ? ROLE.QUEUED: ROLE.PLAYER;
        newPlayer.pv = 3;

        await newPlayer.save();
    }
}


import { ROLE } from '../../constants';
import { NotFoundError, UsernameTakenError, ForbiddenError, WrongCredentialsError } from '../../errors';
import { hashPassword } from '../../middleware/utils';
import Player, { NewPlayerPayload, PlayerType } from '../../models/player';
import { PlayerService } from './PlayerService';

export class PlayerServiceImpl implements PlayerService {
    MAX_PLAYERS = 12

    async getAllPlayers(): Promise<PlayerType[]> {
        return await Player.find();
    }

    async getPlayerCount(): Promise<number> {
        return await Player.where("role").equals(ROLE.PLAYER).countDocuments();
    }

    async getPlayer(username: string):Promise<PlayerType | null> {
        return await Player.findOne({ username });
    }

    async updatePlayerHp(username: string, pv: number):Promise<void>{
        const updatedPlayer = await Player.findOneAndUpdate(
            { username },
            { pv },
            { new: true }
        );

        if (!updatedPlayer) throw new NotFoundError();
    }

    async createPlayer(payload: NewPlayerPayload): Promise<ROLE> {
        if (await this.getPlayer(payload.username) != null) throw new UsernameTakenError();
        const newPlayer = new Player(payload);
        const playersLength = await this.getPlayerCount();

        newPlayer.password = hashPassword(payload.password);
        newPlayer.role = playersLength === this.MAX_PLAYERS ? ROLE.QUEUED: ROLE.PLAYER;
        newPlayer.pv = 3;

        await newPlayer.save();

        return newPlayer.role;
    }

    async deletePlayer(username: string): Promise<void> {
        if (await this.getPlayer(username) === null) {
            throw new NotFoundError();
        };
        await Player.deleteOne({username});
    }
}


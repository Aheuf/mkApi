import { ROLE } from '../../constants.js';
import { hashPassword } from '../../middleware/utils.js';
import Player, { PlayerType } from '../../models/player.js';
import { PlayerService } from './PlayerService.js';

export class PlayerServiceImpl implements PlayerService {
    MAX_PLAYERS = 12;

    async getAllPlayers(): Promise<PlayerType[]> {
        try {
            return await Player.find();
        } catch (error) {
            if(error instanceof Error) throw error;
            throw new Error('Une erreur inconnue est survenue.');
        }
    }

    async getPlayer(username:string, password:string):Promise<PlayerType> {
        try {
            const userPassword = await hashPassword(password);

            const foundedPlayer = await Player.findOne({ username:username, password:userPassword }).exec();

            if (!foundedPlayer) throw new Error("player not found");

            return foundedPlayer;
        } catch (error) {
            if(error instanceof Error) throw error;
            throw new Error('Une erreur inconnue est survenue.');
        }
    }

    async updatePlayerHp(player:PlayerType):Promise<PlayerType>{
        try {
            const updatedPlayer = await Player.findOneAndUpdate(
                { username: player.username },
                { pv:player.pv },
                { new: true }
            );

            if (!updatedPlayer) throw new Error("player not found");

            return updatedPlayer;
        } catch (error) {
            if(error instanceof Error) throw error;
            throw new Error('Une erreur inconnue est survenue.');
        }
    }

    async createPlayer(player: PlayerType): Promise<void> {
        try {
            const newPlayer = new Player(player);
            const playersLength = (await Player.where("role").equals(ROLE.PLAYER)).length;

            newPlayer.password = await hashPassword(player.password);
            newPlayer.role = playersLength === this.MAX_PLAYERS ? ROLE.QUEUED: ROLE.PLAYER;
            newPlayer.pv = 3;

            await newPlayer.save();
        } catch (error) {
            if(error instanceof Error) throw error;
            throw new Error('Une erreur inconnue est survenue.');
        }
    }
}


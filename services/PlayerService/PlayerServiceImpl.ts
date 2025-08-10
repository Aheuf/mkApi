import { ROLE } from '../../constants.js';
import { hashPassword, isPasswordOk } from '../../middleware/utils.js';
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
                { id: player.id },
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

    async createPlayer(player: PlayerType): Promise<PlayerType> {
        try {
            const playersLength = (await Player.find()).length;
            const newPlayer = new Player(player);

            newPlayer.password = await hashPassword(player.password);

            if(playersLength === this.MAX_PLAYERS) {
                newPlayer.role = ROLE.QUEUED;
            }

            return await newPlayer.save();
        } catch (error) {
            if(error instanceof Error) throw error;
            throw new Error('Une erreur inconnue est survenue.');
        }
    }
}


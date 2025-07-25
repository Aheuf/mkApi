import Player, { PlayerType } from '../../models/player.js';
import { PlayerService } from './PlayerService.js';

export class PlayerServiceImpl implements PlayerService {

    async getAllPlayers(): Promise<PlayerType[]> {
        try {
            return await Player.find();
        } catch (error) {
            if(error instanceof Error) throw error;
            throw new Error('Une erreur inconnue est survenue.');
        }
    }

    async getPlayerByName(name:string, firstName:string):Promise<PlayerType> {
        try {
            const foundedPlayer = await Player.findOne({ nom:name, prenom:firstName }).exec();

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
            const newPlayer = new Player(player);
            return await newPlayer.save();
        } catch (error) {
            if(error instanceof Error) throw error;
            throw new Error('Une erreur inconnue est survenue.');
        }
    }
}


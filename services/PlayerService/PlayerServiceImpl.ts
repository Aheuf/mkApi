import { removeAccent } from '../../middleware/utils';
import Player, { PlayerType } from '../../models/Player';
import { PlayerService } from './PlayerService';

export class PlayerServiceImpl implements PlayerService {
    async getAllPlayers(): Promise<PlayerType[]> {
        try {
            return await Player.find();
        } catch (error) {
            throw new Error(error)
        }
    }

    async getPlayerByName(name:string, firstName:string):Promise<PlayerType> {
        try {
            const foundedPlayer = await Player.findOne(
                {
                    nom:removeAccent(name),
                    prenom:removeAccent(firstName)
                }
            ).exec()

            if (!foundedPlayer) throw new Error("player not found");

            return foundedPlayer;
        } catch (error) {
            throw new Error(error)
        }
    }

    async updatePlayerHp(name:string, firstName:string, hp:number):Promise<PlayerType>{
        try {
            const updatedPlayer = await Player.findOneAndUpdate(
                {
                    nom:removeAccent(name),
                    prenom:removeAccent(firstName)
                },
                {
                    pv:hp
                },
                {
                    new: true
                }
            );

            if (!updatedPlayer) throw new Error("player not found");

            return updatedPlayer;
        } catch (error) {
            throw new Error(error);
        }
    }
}


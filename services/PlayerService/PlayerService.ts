import { PlayerType } from "../../models/player.js";

export interface PlayerService {
  getAllPlayers(): Promise<PlayerType[]>;

  getPlayerByName(name:string, firstName:string, password:string):Promise<PlayerType>;

  updatePlayerHp(player: PlayerType):Promise<PlayerType>;

  createPlayer(player: PlayerType): Promise<PlayerType>;
}
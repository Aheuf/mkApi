import { PlayerType } from "../../models/player.js";

export interface PlayerService {
  getAllPlayers(): Promise<PlayerType[]>;

  getPlayerByName(name:string, firstName:string):Promise<PlayerType>;

  updatePlayerHp(name:string, firstName:string, hp:number):Promise<PlayerType>;
}
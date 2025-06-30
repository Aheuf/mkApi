import { PlayerType } from "../../models/Player";

export interface PlayerService {
  getAllPlayers(): Promise<PlayerType[]>;

  getPlayerByName(name:string, firstName:string):Promise<PlayerType>;

  updatePlayerHp(name:string, firstName:string, hp:number):Promise<PlayerType>;
}
import { PlayerType } from "../../models/player.js";

export interface PlayerService {
  getAllPlayers(): Promise<PlayerType[]>;

  getPlayer(username:string, password:string):Promise<PlayerType>;

  updatePlayerHp(player: PlayerType):Promise<PlayerType>;

  createPlayer(player: PlayerType): Promise<PlayerType>;
}
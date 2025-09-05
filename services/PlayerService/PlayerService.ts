import { ROLE } from "../../constants.js";
import { NewPlayerPayload, PlayerType } from "../../models/player.js";

export interface PlayerService {
  getAllPlayers(role: ROLE): Promise<PlayerType[]>;

  getPlayer(username:string, password:string):Promise<PlayerType>;

  updatePlayerHp(username: string, pv: number):Promise<void>;

  createPlayer(payload: NewPlayerPayload): Promise<void>;
}
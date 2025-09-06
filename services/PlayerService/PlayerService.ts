import { ROLE } from "../../constants";
import { NewPlayerPayload, PlayerType } from "../../models/player";

export interface PlayerService {
  getAllPlayers(): Promise<PlayerType[]>;

  getPlayerCount(): Promise<number>;

  getPlayer(username:string):Promise<PlayerType | null>;

  updatePlayerHp(username: string, pv: number):Promise<void>;

  createPlayer(payload: NewPlayerPayload): Promise<ROLE>;

  deletePlayer(username: string): Promise<void>;
}
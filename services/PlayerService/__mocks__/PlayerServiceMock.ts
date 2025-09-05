import { stubedPlayers } from "../../../models/__stubs__/player.stub";
import { PlayerType } from "../../../models/player.js";
import { PlayerService } from "../PlayerService";

export class PlayerServiceMock implements PlayerService {

  getAllPlayers(): Promise<PlayerType[]> {
    return Promise.resolve(stubedPlayers);
  }

  getPlayer(_username:string, _password:string): Promise<PlayerType> {
    return Promise.resolve(stubedPlayers[0]);
  }

  updatePlayerHp(_username: string, _pv: number): Promise<void> {
    return Promise.resolve();
  }

  createPlayer(_player: PlayerType): Promise<void> {
    return Promise.resolve();
  }
}
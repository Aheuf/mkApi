import { stubedPlayers } from "../../../models/__stubs__/player.stub";
import { PlayerType } from "../../../models/player.js";
import { PlayerService } from "../PlayerService";

export class PlayerServiceMock implements PlayerService {

  getAllPlayers(): Promise<PlayerType[]> {
    return Promise.resolve(stubedPlayers);
  }

  getPlayer(_name: string, _firstName: string): Promise<PlayerType> {
    return Promise.resolve(stubedPlayers[0]);
  }

  updatePlayerHp(_player: PlayerType): Promise<PlayerType> {
    return Promise.resolve(stubedPlayers[1]);
  }

  createPlayer(_player: PlayerType): Promise<PlayerType> {
    return Promise.resolve(stubedPlayers[0]);
  }
}
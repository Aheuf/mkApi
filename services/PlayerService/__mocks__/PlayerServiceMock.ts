import { stubedPlayers } from "../../../models/__stubs__/player.stub";
import { PlayerType } from "../../../models/Player";
import { PlayerService } from "../PlayerService";

export class PlayerServiceMock implements PlayerService {
  getAllPlayers(): Promise<PlayerType[]> {
    return Promise.resolve(stubedPlayers);
  }

  getPlayerByName(_name: string, _firstName: string): Promise<PlayerType> {
    return Promise.resolve(stubedPlayers[0]);
  }

  updatePlayerHp(_name: string, _firstName: string, _hp: number): Promise<PlayerType> {
    return Promise.resolve(stubedPlayers[1]);
  }
}
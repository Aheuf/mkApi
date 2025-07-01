import Player from "../../../models/Player";
import { PlayerServiceImpl } from "../PlayerServiceImpl";
import { stubedPlayers } from "../../../models/__stubs__/player.stub"

describe("player service test", () => {
  const service = new PlayerServiceImpl();
  const DbError = new Error("DB Error");

  describe("get all players", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it("OK", async () => {
      // arrange
      Player.find = jest.fn().mockResolvedValue(stubedPlayers);

      // act
      const result = await service.getAllPlayers();

      // assert
      expect(Player.find).toHaveBeenCalled();
      expect(result).toStrictEqual(stubedPlayers);
    });

    it("KO", () => {
      // arrange
      Player.find = jest.fn().mockRejectedValue(DbError);

      // act

      // assert
      expect(service.getAllPlayers()).rejects.toThrow(DbError.message);
      expect(Player.find).toHaveBeenCalled();
    });
  });

  describe("get player", () => {
      const player = stubedPlayers[0];

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("OK", async () => {
      // arrange
      Player.findOne = jest.fn().mockResolvedValue(player);

      // act
      const result = await service.getPlayerByName(player.nom, player.prenom);

      // assert
      expect(result).toStrictEqual(stubedPlayers[0]);
      expect(Player.findOne).toHaveBeenCalled();
    });

    it("KO", () => {
      // arrange
      Player.findOne = jest.fn().mockRejectedValue(DbError);

      // act

      // assert
      expect(service.getPlayerByName(player.nom, player.prenom)).rejects.toThrow(DbError.message);
      expect(Player.findOne).toHaveBeenCalled();

    });

    it("KO not found", () => {
      // arrange
      Player.findOne = jest.fn().mockResolvedValue(null);

      // act

      // assert
      expect(service.getPlayerByName(player.nom, player.prenom)).rejects.toThrow("player not found");
      expect(Player.findOne).toHaveBeenCalled();
    });
  });

  describe("update player hp", () => {
    const player = stubedPlayers[0];

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("OK", async () => {
      // arrange
      Player.findOneAndUpdate = jest.fn().mockResolvedValue(player);

      // act
      const result = await service.updatePlayerHp(player.nom, player.prenom, player.pv);

      // assert
      expect(result).toStrictEqual(stubedPlayers[0]);
      expect(Player.findOneAndUpdate).toHaveBeenCalled();
    });

    it("KO", () => {
      // arrange
      Player.findOneAndUpdate = jest.fn().mockRejectedValue(DbError);

      // act

      // assert
      expect(service.updatePlayerHp(player.nom, player.prenom, player.pv)).rejects.toThrow(DbError.message);
      expect(Player.findOneAndUpdate).toHaveBeenCalled();
    });

    it("KO not found", () => {
      // arrange
      Player.findOneAndUpdate = jest.fn().mockResolvedValue(null);

      // act

      // assert
      expect(service.updatePlayerHp(player.nom, player.prenom, player.pv)).rejects.toThrow("player not found")
      expect(Player.findOneAndUpdate).toHaveBeenCalled();
    });
  });
});
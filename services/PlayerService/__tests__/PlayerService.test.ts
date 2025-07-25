import { PlayerServiceImpl } from "../PlayerServiceImpl.js";
import Player from "../../../models/player.js"
import { stubedPlayers } from "../../../models/__stubs__/player.stub.js"

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

    it("KO", async () => {
      // arrange
      Player.find = jest.fn().mockRejectedValue(DbError);

      // act

      // assert
      await expect(service.getAllPlayers()).rejects.toThrow(DbError.message);
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
      Player.findOne = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(player) });

      // act
      const result = await service.getPlayerByName(player.nom, player.prenom);

      // assert
      expect(result).toStrictEqual(stubedPlayers[0]);
      expect(Player.findOne).toHaveBeenCalled();
    });

    it("KO", async () => {
      // arrange
      Player.findOne = jest.fn().mockReturnValue({ exec: jest.fn().mockRejectedValue(DbError) });

      // act

      // assert
      await expect(service.getPlayerByName(player.nom, player.prenom)).rejects.toThrow(DbError.message);
      expect(Player.findOne).toHaveBeenCalled();
    });

    it("KO not found", async () => {
      // arrange
      Player.findOne = jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue(null) });

      // act

      // assert
      await expect(service.getPlayerByName(player.nom, player.prenom)).rejects.toThrow("player not found");
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
      const result = await service.updatePlayerHp(player);

      // assert
      expect(result).toStrictEqual(stubedPlayers[0]);
      expect(Player.findOneAndUpdate).toHaveBeenCalled();
    });

    it("KO", async () => {
      // arrange
      Player.findOneAndUpdate = jest.fn().mockRejectedValue(DbError);

      // act

      // assert
      await expect(service.updatePlayerHp(player)).rejects.toThrow(DbError.message);
      expect(Player.findOneAndUpdate).toHaveBeenCalled();
    });

    it("KO not found", async () => {
      // arrange
      Player.findOneAndUpdate = jest.fn().mockResolvedValue(null);

      // act

      // assert
      await expect(service.updatePlayerHp(player)).rejects.toThrow("player not found")
      expect(Player.findOneAndUpdate).toHaveBeenCalled();
    });
  });

  describe("create player", () => {
    it("OK", async () => {
      // arrange
      Player.prototype.save = jest.fn().mockResolvedValue(stubedPlayers[0]);

      // act
      const result = await service.createPlayer(stubedPlayers[0]);

      // assert
      expect(result).toStrictEqual(stubedPlayers[0]);
      expect(Player.prototype.save).toHaveBeenCalled();

    });

    it("KO", async () => {
      // arrange
      Player.prototype.save = jest.fn().mockRejectedValue(DbError);

      // act

      // assert
      await expect(service.createPlayer(stubedPlayers[0])).rejects.toThrow(DbError.message);
      expect(Player.prototype.save).toHaveBeenCalled();
    });
  });
});
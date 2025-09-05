import { PlayerServiceImpl } from "../PlayerServiceImpl.js";
import Player from "../../../models/player.js"
import { stubedPlayers } from "../../../models/__stubs__/player.stub.js"
import { ROLE } from "../../../constants.js";
const mockingoose = require('mockingoose');

describe("player service test", () => {
  const service = new PlayerServiceImpl();
  const DbError = new Error("DB Error");

  describe("get all players", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockingoose.resetAll();
    });

    it("OK", async () => {
      // arrange
      mockingoose(Player).toReturn(stubedPlayers, "find")

      // act
      const result = await service.getAllPlayers(ROLE.ADMIN);

      // assert
      expect(result).toMatchObject(stubedPlayers);
    });

    it("KO", async () => {
      // arrange
      mockingoose(Player).toReturn(DbError, 'find');

      // act & assert
      await expect(service.getAllPlayers(ROLE.ADMIN)).rejects.toThrow(DbError.message);
    });
  });

  describe("get player", () => {
    const player = stubedPlayers[0];
    beforeEach(() => {
      jest.clearAllMocks();
      mockingoose.resetAll();
    });

    it("OK", async () => {
      // arrange
      mockingoose(Player).toReturn(player, "findOne")

      // act & assert
      expect(await service.getPlayer(player.nom, player.password)).toMatchObject(stubedPlayers[0]);
    });

    it("KO", async () => {
      // arrange
      mockingoose(Player).toReturn(DbError, "findOne");

      // act & assert
      await expect(service.getPlayer(player.nom, player.prenom)).rejects.toThrow(DbError.message);
    });

    it("KO not found", async () => {
      // arrange
      mockingoose(Player).toReturn(null, "findOne");

      // act

      // assert
      await expect(service.getPlayer(player.nom, player.prenom)).rejects.toThrow("player not found");
    });
  });

  describe("update player hp", () => {
    const player = stubedPlayers[0];

    beforeEach(() => {
      jest.clearAllMocks();
      mockingoose.resetAll();
    });

    it("OK", async () => {
      // arrange
      mockingoose(Player).toReturn(player, "findOneAndUpdate");

      // act
      const result = await service.updatePlayerHp(player);

      // assert
      expect(result).toMatchObject(stubedPlayers[0]);
    });

    it("KO", async () => {
      // arrange
      mockingoose(Player).toReturn(DbError, "findOneAndUpdate");

      // assert
      await expect(service.updatePlayerHp(player)).rejects.toThrow(DbError.message);
    });

    it("KO not found", async () => {
      // arrange
      mockingoose(Player).toReturn(null, "findOneAndUpdate");

      // act

      // assert
      await expect(service.updatePlayerHp(player)).rejects.toThrow("player not found")
    });
  });

  describe("create player", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      mockingoose.resetAll();
    });

    it("OK", async () => {
      // arrange
      mockingoose(Player).toReturn([], "find");
      const playerSaveFn = jest.spyOn(Player.prototype, "save").mockResolvedValueOnce(stubedPlayers[0]);

      // act && assert
      await expect(service.createPlayer(stubedPlayers[0])).resolves.not.toThrow();

      // assert
      expect(playerSaveFn).toHaveBeenCalled();
    });

    it("KO", async () => {
      // arrange
      mockingoose(Player).toReturn([], "find");
      const playerSaveFn = jest.spyOn(Player.prototype, "save").mockRejectedValueOnce(DbError);

      // act && assert
      await expect(service.createPlayer(stubedPlayers[0])).rejects.toThrow();

      // assert
      expect(playerSaveFn).toHaveBeenCalled();
    });
  });
});
import { expect, test, vi } from "vitest";
import { placeBlock } from "./placeBlock";
import { Bot, Villager, VillagerTrade } from "mineflayer";
import v, { Vec3 } from "vec3";
import { Block as _Block } from "prismarine-block";
import _registry from "prismarine-registry";
import { Entity } from "prismarine-entity";
import { findVillagerTrade } from "./findVillagerTrade";
import { BotMother } from "../test_utils/BotMock";
const registry = _registry("1.19");
const Block = require("prismarine-block")(registry) as typeof _Block;

test("fails if there's no villager around", async () => {
  const blockAtMock = vi.fn();
  const digMock = vi.fn();
  const bot = {
    blockAt: blockAtMock,
    dig: digMock,
    entities: {},
    dashboard: {
      log: () => {},
    },
  } as unknown as Bot;
  const airBlock = new Block(
    registry.blocksByName.air.id,
    registry.biomesByName.plains.id,
    0
  );

  const result = await findVillagerTrade(bot);
  expect(result).toBeNull();
});

test("resolves when finding an item the first time it opens the villager", async () => {
  const villagerEntity = {
    name: "villager",
    metadata: [0, { villagerType: 2, villagerProfession: 1, level: 1 }],
  } as Entity;
  const bot = BotMother.create({ entities: { "some-id": villagerEntity } });
  const villager = {
    trades: [
      { outputItem: { enchants: [{ name: "efficiency" }] } } as VillagerTrade,
    ],
  } as Villager;
  bot.openVillagerMock.mockResolvedValue(villager);

  const result = await findVillagerTrade(bot);

  expect(bot.openVillager).toHaveBeenCalledWith(villagerEntity);
  expect(bot.openVillager).toHaveBeenCalledTimes(1);
  expect(result).not.toBeNull();
});

test("places a block on the specified coordinates if the villages has no trades", async () => {
  const villagerEntityWithoutProfession = {
    name: "villager",
    metadata: [0, { villagerType: 2, villagerProfession: 0, level: 1 }],
  } as Entity;
  const villagerEntityWithProfession = {
    name: "villager",
    metadata: [0, { villagerType: 2, villagerProfession: 1, level: 1 }],
  } as Entity;
  const entities: Record<string | symbol, Entity> = {
    "1": villagerEntityWithoutProfession,
  };
  const bot = BotMother.create({
    entities,
  });
  let entitiesPropertyTimesAccessed = 0;
  const proxiedBot = new Proxy(bot, {
    get: function (obj, prop) {
      if (prop === "entities") {
        entitiesPropertyTimesAccessed += 1;
        switch (entitiesPropertyTimesAccessed) {
          case 1:
            return {
              "1": villagerEntityWithoutProfession,
            };
          case 2:
            return {
              "1": villagerEntityWithProfession,
            };
        }
      }
      // @ts-ignore
      return obj[prop];
    },
  });
  const villager = {
    trades: [
      { outputItem: { enchants: [{ name: "efficiency" }] } } as VillagerTrade,
    ],
  } as Villager;
  const block = new Block(
    registry.blocksByName.stone.id,
    registry.biomesByName.plains.id,
    0
  );
  bot.blockAtMock.mockImplementation((v: Vec3) => {
    if (v.x === 10 && v.y === 9 && v.z === 10) return block;
    return null;
  });
  bot.openVillagerMock.mockResolvedValueOnce(villager);
  bot.openVillagerMock.mockResolvedValueOnce(villagerEntityWithProfession);

  const result = await findVillagerTrade(proxiedBot);

  // expect(bot.openVillager).toHaveBeenCalledWith(
  //   villagerEntityWithoutProfession
  // );
  expect(bot.openVillager).toHaveBeenCalledTimes(1);
  expect(result).not.toBeNull();
});

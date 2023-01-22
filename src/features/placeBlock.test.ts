import { expect, test, vi } from "vitest";
import { placeBlock } from "./placeBlock";
import { Bot } from "mineflayer";
import v, { Vec3 } from "vec3";
import { Block as _Block } from "prismarine-block";
import _registry from "prismarine-registry";
const registry = _registry("1.19");
const Block = require("prismarine-block")(registry) as typeof _Block;

test("returns an error when there's no block around the selected coordinates", async () => {
  const blockAtMock = vi.fn();
  const bot = {
    blockAt: blockAtMock,
    dashboard: {
      log: () => {},
    },
  } as unknown as Bot;
  const airBlock = new Block(
    registry.blocksByName.air.id,
    registry.biomesByName.plains.id,
    0
  );
  blockAtMock.mockReturnValue(airBlock);
  const result = await placeBlock(bot, v({ x: 10, y: 10, z: 10 }));
  expect(result).toBe(null);
  expect(blockAtMock).toHaveBeenCalledTimes(6);
});

test("places a block using the first possible reference block", async () => {
  const blockAtMock = vi.fn();
  const placeBlockMock = vi.fn();
  const bot = {
    blockAt: blockAtMock,
    placeBlock: placeBlockMock,
    dashboard: {
      log: () => {},
    },
  } as unknown as Bot;
  const block = new Block(
    registry.blocksByName.stone.id,
    registry.biomesByName.plains.id,
    0
  );
  blockAtMock.mockImplementation((v: Vec3) => {
    if (v.x === 10 && v.y === 9 && v.z === 10) return block;
    return null;
  });

  const result = await placeBlock(bot, v({ x: 10, y: 10, z: 10 }));

  expect(result).not.toBe(null);
  expect(blockAtMock).toHaveBeenCalledTimes(6);
  expect(bot.placeBlock).toHaveBeenCalledWith(block, v({ x: 0, y: 1, z: 0 }));
});

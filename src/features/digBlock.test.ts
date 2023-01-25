import { expect, test, vi } from "vitest";
import { placeBlock } from "./placeBlock";
import { Bot } from "mineflayer";
import v, { Vec3 } from "vec3";
import { Block as _Block } from "prismarine-block";
import _registry from "prismarine-registry";
import { digBlock } from "./digBlock";
const registry = _registry("1.19");
const Block = require("prismarine-block")(registry) as typeof _Block;

test("cannot dig air", async () => {
  const blockAtMock = vi.fn();
  const digMock = vi.fn();
  const bot = {
    blockAt: blockAtMock,
    dig: digMock,
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

  const result = await digBlock(bot, v({ x: 10, y: 10, z: 10 }));

  expect(result).toBe(null);
  expect(digMock).not.toHaveBeenCalled();
});

test("digs dirt", async () => {
  const blockAtMock = vi.fn();
  const digMock = vi.fn();
  const bot = {
    blockAt: blockAtMock,
    dig: digMock,
    dashboard: {
      log: () => {},
    },
  } as unknown as Bot;
  const dirtBlock = new Block(
    registry.blocksByName.dirt.id,
    registry.biomesByName.plains.id,
    0
  );
  blockAtMock.mockReturnValue(dirtBlock);

  const result = await digBlock(bot, v({ x: 10, y: 10, z: 10 }));

  expect(result).not.toBe(null);
  expect(digMock).toHaveBeenCalled();
});

import { Bot } from "mineflayer";
import { vi } from "vitest";
import { Entity } from "prismarine-entity";

export class BotMother {
  static create(props: Partial<Bot> = {}) {
    const blockAtMock = vi.fn();
    const digMock = vi.fn();
    const openVillagerMock = vi.fn();
    const villagerEntity = { name: "villager" } as Entity;
    const bot = {
      blockAt: blockAtMock,
      dig: digMock,
      openVillager: openVillagerMock,
      dashboard: {
        log: () => {},
      },
      ...props,
    } as unknown as Bot;
    return {
      ...bot,
      blockAtMock,
      digMock,
      openVillagerMock,
    };
  }
}

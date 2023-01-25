import { Bot } from "mineflayer";
import { hasProfession } from "../utils/hasProfession";
import { placeBlock } from "./placeBlock";
import v from "vec3";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export async function findVillagerTrade(bot: Bot): Promise<void | null> {
  while (true) {
    await sleep(50);
    const entities = Object.entries(bot.entities).map(([, entity]) => entity);
    const villagerEntity = entities.find(
      (entity) => entity.name === "villager"
    );
    if (!villagerEntity) return null;
    if (!hasProfession(villagerEntity)) {
      await placeBlock(bot, v({ x: 10, y: 10, z: 10 }));
      continue;
    }
    const villager = await bot.openVillager(villagerEntity);
    bot.dashboard.log(
      `Encontré los trades: ${JSON.stringify(
        villager.trades
      )} del aldeano ${villager}`
    );
    const wishedTrade = villager.trades.find((trade) =>
      trade.outputItem.enchants.some((enchant) => enchant.name === "efficiency")
    );
    if (!!wishedTrade) break;
  }
}

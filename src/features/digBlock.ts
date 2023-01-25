import { Bot } from "mineflayer";
import { Vec3 } from "vec3";

export async function digBlock(
  bot: Bot,
  blockPoint: Vec3
): Promise<void | null> {
  const block = bot.blockAt(blockPoint);
  if (block === null || block.name === "air") return null;
  await bot.dig(block);
  return;
}

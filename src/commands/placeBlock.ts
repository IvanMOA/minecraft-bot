import { Command } from "../Command";
import { Bot } from "mineflayer";
import { z } from "zod";
import v from "vec3";
import { placeBlock } from "../features/placeBlock";

export const makePlaceBlock: (bot: Bot) => Command =
  (bot) =>
  async (...args) => {
    const stringCoercedToNumberSchema = z.preprocess(
      (a) => parseInt(z.string().parse(a), 10),
      z.number().positive().max(100)
    );
    const commandInputSchema = z.tuple([
      stringCoercedToNumberSchema,
      stringCoercedToNumberSchema,
      stringCoercedToNumberSchema,
    ]);
    const coordinates = commandInputSchema.safeParse(args);
    if (!coordinates.success) {
      bot.dashboard.log("No pude parsear tu input");
      return;
    }
    const point = v({
      x: coordinates.data[0],
      y: coordinates.data[1],
      z: coordinates.data[2],
    });
    bot.dashboard.log(`Voy a intentar poner un bloque en ${point}`);
    await placeBlock(bot, point);
  };

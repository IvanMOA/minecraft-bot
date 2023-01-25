import { goals, Movements } from "mineflayer-pathfinder";
import { Command } from "../Command";
import { Bot } from "mineflayer";
import { findVillagerTrade } from "../features/findVillagerTrade";

export const makeFindVillagerTradeCommand: (bot: Bot) => Command =
  (bot) =>
  async (...args) => {
    await findVillagerTrade(bot);
  };

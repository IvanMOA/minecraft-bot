import { goals, Movements } from "mineflayer-pathfinder";
import { Command } from "../Command";
import { Bot } from "mineflayer";

export const makeCome: (bot: Bot) => Command = (bot) => () => {
  // @ts-ignore
  const defaultMove = new Movements(bot);
  const { GoalNear } = goals;
  const target = bot.players["ProtoXI"] ? bot.players["ProtoXI"].entity : null;
  if (!target) {
    bot.dashboard.log("I don't see you!");
    return;
  }
  const p = target.position;
  bot.pathfinder.setMovements(defaultMove);
  bot.pathfinder.setGoal(new GoalNear(p.x, p.y, p.z, 1));
};

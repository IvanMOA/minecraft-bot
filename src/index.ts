import mineflayer from "mineflayer";
import { mineflayer as mineflayerViewer } from "prismarine-viewer";
import inventoryViewer from "mineflayer-web-inventory";
import { pathfinder, Movements, goals } from "mineflayer-pathfinder";
import { makeComeCommand } from "./commands";
import { makePlaceBlockCommand } from "./commands/placeBlock";
import { findVillagerTrade } from "./features/findVillagerTrade";
import { makeFindVillagerTradeCommand } from "./commands/findVillagerTrade";

const MINECRAFT_SERVER_PORT = 25565;
const bot = mineflayer.createBot({
  host: "localhost",
  username: "hikid",
  version: "1.19",
});

inventoryViewer(bot);
bot.loadPlugin(pathfinder);
bot.loadPlugin(
  require("mineflayer-dashboard")({
    chatPattern: /^» \w+? » /,
  })
);
bot.dashboard.commands["come"] = makeComeCommand(bot);
bot.dashboard.commands["placeBlock"] = makePlaceBlockCommand(bot);
bot.dashboard.commands["findVillagerTrade"] = makeFindVillagerTradeCommand(bot);

bot.once("spawn", () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: false });
});

bot.on("kicked", console.log);
bot.on("error", console.log);

import mineflayer from "mineflayer";
import { mineflayer as mineflayerViewer } from "prismarine-viewer";
import inventoryViewer from "mineflayer-web-inventory";
import { pathfinder, Movements, goals } from "mineflayer-pathfinder";
import { makeCome } from "./commands";
import { makePlaceBlock } from "./commands/placeBlock";

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

bot.dashboard.commands["come"] = makeCome(bot);
bot.dashboard.commands["placeBlock"] = makePlaceBlock(bot);

bot.once("spawn", () => {
  mineflayerViewer(bot, { port: 3007, firstPerson: false }); // port is the minecraft server port, if first person is false, you get a bird's-eye view
});

bot.on("kicked", console.log);
bot.on("error", console.log);

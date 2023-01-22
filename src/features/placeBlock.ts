import { Bot } from "mineflayer";
import v, { Vec3 } from "vec3";

export async function placeBlock(
  bot: Bot,
  blockPoint: Vec3
): Promise<void | null> {
  const blockCandidatesToUseAsAnchorToPlaceBlock = [
    {
      referenceBlockPoint: blockPoint.offset(0, 0, -1),
      blockFaceToUseToPlaceBlock: v({ x: 0, y: 0, z: 1 }),
    },
    {
      referenceBlockPoint: blockPoint.offset(0, 1, 0),
      blockFaceToUseToPlaceBlock: v({ x: 0, y: -1, z: 0 }),
    },
    {
      referenceBlockPoint: blockPoint.offset(0, -1, 0),
      blockFaceToUseToPlaceBlock: v({ x: 0, y: 1, z: 0 }),
    },
    {
      referenceBlockPoint: blockPoint.offset(1, 0, 0),
      blockFaceToUseToPlaceBlock: v({ x: -1, y: 0, z: 0 }),
    },
    {
      referenceBlockPoint: blockPoint.offset(-1, 0, 0),
      blockFaceToUseToPlaceBlock: v({ x: 1, y: 0, z: 0 }),
    },
    {
      referenceBlockPoint: blockPoint.offset(0, 0, 1),
      blockFaceToUseToPlaceBlock: v({ x: 0, y: 0, z: -1 }),
    },
  ].map(({ referenceBlockPoint, blockFaceToUseToPlaceBlock }) => ({
    referenceBlock: bot.blockAt(referenceBlockPoint),
    blockFaceToUseToPlaceBlock,
  }));
  const blockToUseAsReference = blockCandidatesToUseAsAnchorToPlaceBlock.find(
    (block) =>
      block.referenceBlock !== null && block.referenceBlock.name !== "air"
  );
  if (!blockToUseAsReference) return null;
  bot.dashboard.log(
    `Intentando poner bloque usando como referencia ${blockToUseAsReference.referenceBlock?.name} en su cara ${blockToUseAsReference.blockFaceToUseToPlaceBlock}`
  );
  try {
    await bot.placeBlock(
      blockToUseAsReference.referenceBlock!,
      blockToUseAsReference.blockFaceToUseToPlaceBlock
    );
  } catch (e) {
    bot.dashboard.log("No pude poner el bloque, lo siento");
  }
  return;
}

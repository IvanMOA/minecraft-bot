import { Entity } from "prismarine-entity";

export function hasProfession(entity: Entity) {
  return entity.metadata.some(
    (entry: any) => typeof entry === "object" && entry.villagerProfession !== 0
  );
}

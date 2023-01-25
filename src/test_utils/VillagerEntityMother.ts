import { Entity } from "prismarine-entity";
export class VillagerEntityMother {
  private entity = {
    name: "villager",
    metadata: [],
  } as unknown as Entity;
  constructor() {}
  static builder(): VillagerEntityMother {
    return new VillagerEntityMother();
  }
  withoutProfession(): VillagerEntityMother {
    this.entity.metadata.push({
      villagerType: 2,
      villagerProfession: 0,
      level: 1,
    });
    return this;
  }
  withProfession(): VillagerEntityMother {
    this.entity.metadata.push({
      villagerType: 2,
      villagerProfession: 1,
      level: 1,
    });
    return this;
  }
  build() {
    return this.entity;
  }
}

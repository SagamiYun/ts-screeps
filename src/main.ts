import { ErrorMapper } from "utils/ErrorMapper";
import { roleHarvester } from "role/action/harvester"
import { roleUpgrader } from "role/action/upgrader"
import { roleBuilder } from "role/action/builder"
// import { initialize } from "initialize";
import { spawnCreeps } from "preserve/maintainCreepCount"
import { buildTrafficMapRoad } from "build/buildTrafficMapRoad"

// initialize();

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  // 维持Creep函数
  spawnCreeps();

  // 根据Creep的行驶路径建造道路
  // buildTrafficMapRoad();

  for(const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
    }

    if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
    }

    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }


  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});

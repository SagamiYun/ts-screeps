import { ErrorMapper } from "utils/ErrorMapper";
import { roleHarvester } from "role/action/harvester"
import { roleUpgrader } from "role/action/upgrader"
import { roleBuilder } from "role/action/builder"
import { roleRepairer } from "role/action/repairer"
import { roleCarrier } from "role/action/carrier"
import { roleClaimer } from "role/action/claimer"
import { roleSmallFree } from "role/action/smallfree"
import { exteriorHarvesterRole } from "role/action/exteriorHarvester"
import { roleTower } from "construct/tower"
import { initialize } from "initialize";
import { constructLink } from "./construct/link"
import { spawnCreeps } from "preserve/maintainCreepCount"
import { loopGlobalStatus } from "preserve/globalStatus"
import { buildTrafficMapRoad } from "build/buildTrafficMapRoad"
import { countTrafficMapRoad } from "build/countTrafficMapRoad"


initialize();

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  const room = Game.rooms["E57N57"];

  // 更新全局状态
  loopGlobalStatus(room);

   // 在每个房间中找到所有的塔
  const towers = room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_TOWER }
  }) as StructureTower[];

  // 对每个塔调用run方法
  for(let tower of towers) {
      roleTower.run(tower);
  }

  // 维持Creep函数
  spawnCreeps(room);

  // 根据ID传输对应的Link能量
  constructLink();

  // 根据坐标统计建造道路
  buildTrafficMapRoad(room);

  for(const name in Game.creeps) {
    const creep = Game.creeps[name];

    // 根据Creep的行驶路径进行统计
    countTrafficMapRoad(creep);

    // 进行能量源creep更新
    if(creep.memory.sourceId) {
      if(!Memory.sourceCreeps[creep.memory.sourceId]) {
          Memory.sourceCreeps[creep.memory.sourceId] = 1;
      } else {
          Memory.sourceCreeps[creep.memory.sourceId]++;
      }
    }

    if (creep.memory.role == 'harvester') {
        roleHarvester.run(creep);
    }

    if (creep.memory.role == 'upgrader') {
        roleUpgrader.run(creep);
    }

    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }

    if (creep.memory.role == 'repairer') {
      roleRepairer.run(creep);
    }

    if (creep.memory.role == 'carrier') {
      roleCarrier.run(creep, room);
    }

    if (creep.memory.role == 'claimer') {
      // roleClaimer.run(creep, 'E57N58');
      roleClaimer.run(creep, undefined,
        "I'm a novice in this intriguing game," +
        " a full-stack developer in the real world. " +
        " Please be gentle!");
    }

    if (creep.memory.role == 'smallfree') {
      roleSmallFree.run(creep);
    }

    if (creep.memory.role == 'exteriorHayverter') {
      exteriorHarvesterRole.run(creep, 'E57N58', 'E57N57');
    }

  }


  // 删除已死亡creep的内存
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});

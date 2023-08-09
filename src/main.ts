import { ErrorMapper } from "utils/ErrorMapper";
import { roleHarvester } from "role/action/harvester"
import { roleUpgrader } from "role/action/upgrader"
import { roleBuilder } from "role/action/builder"
import { roleRepairer } from "role/action/repairer"
import { roleTower } from "role/action/tower"
// import { initialize } from "initialize";
import { spawnCreeps } from "preserve/maintainCreepCount"
import { buildTrafficMapRoad } from "build/buildTrafficMapRoad"


// initialize();

export const loop = ErrorMapper.wrapLoop(() => {
  console.log(`Current game tick is ${Game.time}`);

  const room = Game.rooms["E57N57"];
   // 在每个房间中找到所有的塔
  const towers = room.find(FIND_MY_STRUCTURES, {
    filter: { structureType: STRUCTURE_TOWER }
  }) as StructureTower[];

  // 对每个塔调用run方法
  for(let tower of towers) {
      roleTower.run(tower);
  }

  // 维持Creep函数
  spawnCreeps();


  for(const name in Game.creeps) {
    const creep = Game.creeps[name];

    // 根据Creep的行驶路径建造道路
    // buildTrafficMapRoad(creep);

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
  }


  // 删除已死亡creep的内存
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
});

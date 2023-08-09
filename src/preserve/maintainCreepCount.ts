import { CreepRole } from '../creeps/type/creepType'
import { createCreep, createCustomCreep } from '../creeps/action/create'

interface CreepCount {
  [CreepRole.HARVESTER]: number;
  [CreepRole.BUILDER]: number;
  [CreepRole.UPGRADER]?: number;
  [CreepRole.REPAIRER]?: number;
  [CreepRole.CARRIER]?: number;
  [CreepRole.FIGHTER]?: number;
}

// Creep类型和数量
const creepCounts: CreepCount = {
  [CreepRole.HARVESTER]: 4,
  [CreepRole.BUILDER]: 2,
  [CreepRole.UPGRADER]: 2,
  [CreepRole.REPAIRER]: 2,

  // [CreepRole.CARRIER]: 3,
  // [CreepRole.FIGHTER]: 3,
  // [CreepRole.BIGFREE]: 2,
  // [CreepRole.SMALLFREE]: 4
};

export function spawnCreeps() {
  for(let type in creepCounts) {
      // 计算当前数量
      let currentCount = _.filter(Game.creeps, (creep) => creep.memory.role == type).length;
      // 如果当前数量小于期望数量
      let desiredCount = creepCounts[type as keyof CreepCount];
      if(desiredCount !== undefined && currentCount < desiredCount) {
          // 找到一个空闲的spawn
          for(let name in Game.spawns) {
              let spawn = Game.spawns[name];

              if(spawn.spawning == null) {
                  // 孵化新的creep
                  createCreep(type as CreepRole, spawn)

                  // 能量足够建造大家伙
                  // if (spawn.room.energyAvailable >= 550) {
                  //   spawn.spawnCreep( [WORK,WORK,WORK,WORK,CARRY,MOVE,MOVE],
                  //       type + 'Big:' + Date.now(),
                  //     { memory: { role: type } } );
                  // }  else if (type === 'none') {
                  //   // 能量不够建造小家伙
                  //   spawn.spawnCreep([WORK, CARRY, MOVE], type + ": " + Date.now(), {memory: {role: type}});
                  // }

                  console.log("执行了维持Creep函数, Creep类型为: " + type)
                  break;
              }
          }
      }
  }
}

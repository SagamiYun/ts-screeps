import { IRoomStatus } from './globalStatus'
import { CreepRole } from '../creeps/type/creepType'
import { createCreep, createCustomCreep } from '../creeps/action/create'

interface CreepCount {
  [CreepRole.HARVESTER]?: number;
  [CreepRole.BUILDER]?: number;
  [CreepRole.UPGRADER]?: number;
  [CreepRole.REPAIRER]?: number;
  [CreepRole.CARRIER]?: number;
  [CreepRole.FIGHTER]?: number;
  [CreepRole.BIGFREE]?: number;
  [CreepRole.SMALLFREE]?: number;
  [CreepRole.EXTERIORHARVESTER]?: number;
}

// Creep默认类型和数量
const defaultCreepCounts: CreepCount = {
  [CreepRole.HARVESTER]: 2,
  [CreepRole.BUILDER]: 1,
  [CreepRole.UPGRADER]: 1,
  [CreepRole.REPAIRER]: 1,
  [CreepRole.CARRIER]: 2,
  // [CreepRole.FIGHTER]: 3,
  // [CreepRole.BIGFREE]: 2,
  [CreepRole.SMALLFREE]: 1,
  [CreepRole.EXTERIORHARVESTER]: 2
};

function getCreepCounts(room: Room): CreepCount {
  let creepCounts = {...defaultCreepCounts};
  switch(room.memory.status) {
      case IRoomStatus.DEFENSEMODE:
          // TODO:
          break;
      case IRoomStatus.ATTACKSUPPLYMODE:
          // TODO:
          break;
      case IRoomStatus.COLONYEXPANSIONMODE:
          // TODO:
          break;
      case IRoomStatus.RESOURCESHORTAGEMODE:
          creepCounts[CreepRole.SMALLFREE] = 3;
          creepCounts[CreepRole.UPGRADER] = 1;
          creepCounts[CreepRole.BUILDER] = 0;
          break;
      case IRoomStatus.BUILDINGMODE:
          creepCounts[CreepRole.BUILDER] = 2;
          break;
      case IRoomStatus.NORMALMODE:
          break;
  }
  return creepCounts;
}

export function spawnCreeps(room: Room) {
  const creepCounts = getCreepCounts(room);

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
                  console.log("执行了维持Creep函数, Creep类型为: " + type)
                  break;
              }
          }
      }
  }
}

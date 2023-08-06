// Creep类型和数量
const creepTypes = {
  'harvester': 2,
  'builder': 3,
  'upgrader': 3
};


export function spawnCreeps() {
  for(let type in creepTypes) {
      // 计算当前数量
      let currentCount = _.filter(Game.creeps, (creep) => creep.memory.role == type).length;
      // 如果当前数量小于期望数量
      if(currentCount < creepTypes[type as keyof typeof creepTypes]) {
          // 找到一个空闲的spawn
          for(let name in Game.spawns) {
              let spawn = Game.spawns[name];
              if(spawn.spawning == null) {
                  // 孵化新的creep
                  let timestamp = Date.now();
                  spawn.spawnCreep([WORK, CARRY, MOVE], type + ": " + timestamp, {memory: {role: type}});
                  console.log("执行了维持Creep函数")
                  break;
              }
          }
      }
  }
}

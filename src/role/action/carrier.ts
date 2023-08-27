export const roleCarrier = {

    run: function(creep: Creep) {
        // 如果creep正在搬运能量但是能量已经用完，就去获取能量
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 fetch');
        }
        // 如果creep不在搬运能量并且能量满载，就去搬运能量
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('⚡ transport');
        }

        if(creep.memory.working) {
            // 找到能量最少的建筑
            const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_EXTENSION
                                || s.structureType == STRUCTURE_SPAWN
                                // || s.structureType == STRUCTURE_TOWER
                                ) && s.energy < s.energyCapacity
            });

            // 找到未满75%的tower
            const targetTow = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType === STRUCTURE_TOWER && (s.energy / s.energyCapacity) < 0.3
            });

            if(target) {
                // 如果找到了目标，就向目标搬运能量
                if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else if(targetTow) {
                if(creep.transfer(targetTow, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetTow, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        } else {
            // 找到最近的storage
            const source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0
            });
            if(source) {
                // 如果找到了storage，就从storage中取能量
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
    }
};

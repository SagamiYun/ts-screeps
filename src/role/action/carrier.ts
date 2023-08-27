import { IRoomStatus } from '../../preserve/globalStatus'

const targetLink: StructureLink | null = Game.getObjectById('64eb082d587a557eba071138');

export const roleCarrier = {
    run: function(creep: Creep, room: Room) {

        !creep.memory.excetendBool && (creep.memory.excetendBool = false)

        // 如果creep正在搬运能量但是能量已经用完，就去获取能量
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.memory.excetendBool = false;
            creep.say('🔄 fetch');
        }
        // 如果creep不在搬运能量并且能量满载，就去搬运能量
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('⚡ transport');
        }

        // 找到最近的storage
        const source = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0
        });

        if(creep.memory.working) {
            // 找到能量最少的建筑
            const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_EXTENSION
                                || s.structureType == STRUCTURE_SPAWN
                                ) && s.energy < s.energyCapacity
            });

            switch(room.memory.status) {
                case IRoomStatus.DEFENSEMODE:
                    const defenseTargetTow = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => s.structureType === STRUCTURE_TOWER && (s.energy / s.energyCapacity) < 0.9
                    });

                    if(defenseTargetTow) {
                        if(creep.transfer(defenseTargetTow, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(defenseTargetTow, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else if(target) {
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    break;
                case IRoomStatus.ATTACKSUPPLYMODE:
                    // TODO:
                    break;
                case IRoomStatus.COLONYEXPANSIONMODE:
                    // TODO:
                    break;
                case IRoomStatus.RESOURCESHORTAGEMODE:
                    // TODO:
                    break;
                case IRoomStatus.NORMALMODE:
                    const targetTow = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => s.structureType === STRUCTURE_TOWER && (s.energy / s.energyCapacity) < 0.3
                    });

                    if (creep.memory.excetendBool && source) {
                        const storage = source;
                        if(creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else if(target) {
                        // 如果找到了目标，就向目标搬运能量
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    } else if(targetTow) {
                        if(creep.transfer(targetTow, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(targetTow, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    break;
            }


        } else {

            // 找到能量满的建筑
            const sourceDefens = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_EXTENSION
                                || s.structureType == STRUCTURE_SPAWN
                                ) && s.energy === s.energyCapacity
            });

            switch(room.memory.status) {
                case IRoomStatus.DEFENSEMODE:
                    if(sourceDefens) {
                        // 如果找到了storage，就从storage中取能量
                        if(creep.withdraw(sourceDefens, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(sourceDefens, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    } else if(source) {
                        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    break;
                case IRoomStatus.ATTACKSUPPLYMODE:
                    // TODO:
                    break;
                case IRoomStatus.COLONYEXPANSIONMODE:
                    // TODO:
                    break;
                case IRoomStatus.RESOURCESHORTAGEMODE:
                    // TODO:
                    break;
                case IRoomStatus.NORMALMODE:
                    if(targetLink) {
                        if(creep.withdraw(targetLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.memory.excetendBool = true;
                            creep.moveTo(targetLink, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    } else if(source) {
                        // 如果找到了storage，就从storage中取能量
                        if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                        }
                    }
                    break;
            }
        }
    }
};

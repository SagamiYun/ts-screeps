export const roleRepairer = {

    run: function(creep: Creep) {
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('🚧 repair');
        }

        if(creep.memory.working) {
            // First, find towers that need energy
            let towers = Game.spawns['Spawn1'].room.find(FIND_MY_STRUCTURES).filter((structure) => {
                if(structure instanceof StructureTower) {
                    let tower = structure as StructureTower;
                    // return tower.energy < tower.energyCapacity;
                    return false;
                }
                return false;
            });


            if(towers.length) {
                // If there are towers that need energy, fill them first
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                // If no towers need energy, then repair buildings
                const targets = creep.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax &&
                    (object.structureType == STRUCTURE_ROAD || object.structureType == STRUCTURE_RAMPART)
                });

                targets.sort((a,b) => a.hits - b.hits);

                if(targets.length > 0) {
                    if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }


};

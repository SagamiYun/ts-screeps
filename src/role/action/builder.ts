export const roleBuilder = {
    run: function(creep: Creep): void {
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.working = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
            creep.memory.working = true;
            creep.say('🚧 build');
        }

        if(creep.memory.working) {
            // First, try to find a construction site and build it
            const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }

        }
        else {
            // Find the closest source of energy
            const targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    // return (structure.structureType == STRUCTURE_EXTENSION ||
                    //         structure.structureType == STRUCTURE_SPAWN ||

                            return (
                            structure.structureType == STRUCTURE_STORAGE) &&
                            structure.store.getFreeCapacity(RESOURCE_ENERGY) < structure.store.getCapacity(RESOURCE_ENERGY);
                }
            });
            if(targets.length > 0) {
                if(creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            // const sources = creep.room.find(FIND_SOURCES);
            // if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            // }
        }
    }



    // run: function(creep: Creep): void {
    //     if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0) {
    //         creep.memory.working = false;
    //         creep.say('🔄 harvest');
    //     }
    //     if(!creep.memory.working && creep.store.getFreeCapacity() == 0) {
    //         creep.memory.working = true;
    //         creep.say('🚧 build');
    //     }

    //     if(creep.memory.working) {
    //         // First, try to find a tower and fill it with energy
    //         const towers = creep.room.find(FIND_MY_STRUCTURES, {
    //             filter: { structureType: STRUCTURE_TOWER }
    //         }) as StructureTower[];
    //         if(towers.length) {
    //             const tower = towers[0];
    //             if(tower.energy < tower.energyCapacity) {
    //                 if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                     creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
    //                     return;
    //                 }
    //             }
    //         }

    //         // If no tower needs energy, continue with the original logic
    //         const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    //         if(targets.length) {
    //             if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
    //             }
    //         }
    //     }
    //     else {
    //         const sources = creep.room.find(FIND_SOURCES);
    //         if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
    //         }
    //     }
    // }

};

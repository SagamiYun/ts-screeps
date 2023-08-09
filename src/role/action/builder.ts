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
                    return;
                }
            }

            // If no construction site needs building, try to find a tower and fill it with energy
            const towers = creep.room.find(FIND_MY_STRUCTURES, {
                filter: { structureType: STRUCTURE_TOWER }
            }) as StructureTower[];
            if(towers.length) {
                const tower = towers[0];
                if(tower.energy < tower.energyCapacity) {
                    if(creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
        else {
            // Find the nearest energy source to the construction sites
            // 想通过最近的能源点进行能量采集，结果失败了
            // const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            // if(targets.length) {
            //     const sources = targets[0].pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            //     if(sources) {
            //         if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
            //             creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
            //         }
            //     }
            // }

            const sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
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

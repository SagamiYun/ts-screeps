export const roleHarvester = {

    // run: function(creep: Creep): void {
    //     if(creep.store.getFreeCapacity() > 0) {
    //         let sources = creep.room.find(FIND_SOURCES);
    //         let leastUsedSource = sources[0];

    //         for(let source of sources) {
    //             if(!Memory.sourceCreeps[source.id] || Memory.sourceCreeps[source.id] < Memory.sourceCreeps[leastUsedSource.id]) {
    //                 leastUsedSource = source;
    //             }
    //         }

    //         creep.memory.sourceId = leastUsedSource.id;

    //         if(creep.harvest(leastUsedSource) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(leastUsedSource, {visualizePathStyle: {stroke: '#ffaa00'}});
    //         }
    //     }
    //     else {
    //         let targets = creep.room.find(FIND_STRUCTURES, {
    //             filter: (structure) => {
    //                 return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
    //                     structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    //             }
    //         });
    //         if(targets.length > 0) {
    //             if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
    //             }
    //         }
    //     }
    // }

    // run: function(creep: Creep): void{
	//     if(creep.store.getFreeCapacity() > 0) {
    //         let sources = creep.room.find(FIND_SOURCES);

    //         if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
    //         }
    //     }
    //     else {
    //         let targets = creep.room.find(FIND_STRUCTURES, {
    //                 filter: (structure) => {
    //                     return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
    //                         structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    //                 }
    //         });
    //         if(targets.length > 0) {
    //             if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                 creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
    //             }
    //         }
    //     }
	// }

    run: function(creep: Creep): void {
        if(creep.store.getFreeCapacity() > 0) {
            let sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_STORAGE) &&
                    // return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            });
            if(targets.length > 0) {
                // find the closest target
                let target = creep.pos.findClosestByPath(targets);
                if (target) {
                    if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }
    }


    // run: function(creep: Creep): void{
    //     if(creep.memory.sourceId === undefined) {
    //         // 如果Creep的内存中没有sourceIndex，我们将其分配给一个资源点
    //         // 这里我们只是简单地使用当前时间对资源点数量取余，以实现基本的负载均衡
    //         const sources = creep.room.find(FIND_SOURCES);
    //         creep.memory.sourceIndex = Game.time % sources.length;
    //     }

    //     if(creep.store.getFreeCapacity() > 0 && creep.memory.sourceIndex) {
    //         const sources = creep.room.find(FIND_SOURCES);
    //         if(creep.harvest(sources[creep.memory.sourceIndex]) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(sources[creep.memory.sourceIndex]);
    //         }
    //     }
    //     else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
    //         if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //             creep.moveTo(Game.spawns['Spawn1']);
    //         }
    //     }
    // }
};



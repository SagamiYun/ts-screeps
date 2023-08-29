export const roleSmallFree = {

    run: function(creep: Creep): void {
         // 找到房间中所有的尸体资源
        // const tombstones = creep.room.find(FIND_TOMBSTONES);
        // let targets = creep.room.find(FIND_STRUCTURES, {
        //     filter: (structure) => {
        //         return (structure.structureType == STRUCTURE_STORAGE);
        //     }
        // });


        //1  !creep.memory.excetendNumberControl && (creep.memory.excetendNumberControl = -1)

        // tombstones.length ? (creep.memory.excetendNumberControl = 1) : (creep.memory.excetendNumberControl = -1);

        // console.log(creep.memory.excetendNumberControl);

        // if((creep.memory.excetendNumberControl != -1)) {
        //     if (creep.memory.excetendNumberControl == 1) {
        //          // 如果有尸体资源，找到第一个尸体
        //         let target = tombstones[0];
        //         // 检查尸体中是否有资源
        //         for(const resourceType in target.store) {
        //             // 如果有资源，尝试去收集
        //             if(target.store[resourceType as ResourceConstant] > 0 && creep.store.getFreeCapacity() == 0) {
        //                 if(creep.withdraw(target, resourceType as ResourceConstant) == ERR_NOT_IN_RANGE) {
        //                     // 如果尸体不在范围内，移动到尸体的位置
        //                     creep.moveTo(target);
        //                 }
        //                 // 如果开始收集资源，就返回，不再检查其他尸体
        //                 return;
        //             } else {
        //                 creep.memory.excetendNumberControl = 0;
        //             }
        //         }

        //     } else if (creep.memory.excetendNumberControl == 0) {
        //         if (targets[0]) {
        //             if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(targets[0]);
        //             }
        //         }
        //     }
        // } else {
            if(creep.store.getFreeCapacity() > 0) {
                let sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                let targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_LINK) &&
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
        // }

    }
}

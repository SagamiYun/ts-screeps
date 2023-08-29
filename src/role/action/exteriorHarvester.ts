export const exteriorHarvesterRole = {
    run: function(creep: Creep, harvesterRoom: string, storeRoom: string): void {
        let targetLink: StructureLink | null = Game.getObjectById('64eafd140ec2c588b6787f74');

        const storeRoomObjet = Game.rooms[storeRoom];
        const harvesterRoomPosittion = new RoomPosition(29, 48, harvesterRoom)
        const storeRoomPosittion = new RoomPosition(20, 3, storeRoom)

        // if(creep.store.getFreeCapacity() > 0) {
        //     if (creep.room.name == harvesterRoom && Game.rooms[harvesterRoom]) {
        //         if (creep.memory.room != harvesterRoom) {
        //             creep.memory.room = creep.room.name;
        //             creep.moveTo(harvesterRoomPosittion);
        //         } else {
        //             const harvesterRoomObjet = Game.rooms[harvesterRoom];
        //             const sources = harvesterRoomObjet.find(FIND_SOURCES);
        //             console.log(harvesterRoomObjet.find(FIND_SOURCES));
        //             if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //             }
        //         }
        //     } else {
        //         creep.moveTo(harvesterRoomPosittion);
        //     }
        // }
        // else if (targetLink) {
        //     if (creep.room.name == storeRoom && storeRoomObjet) {
        //         if (creep.memory.room != storeRoom) {
        //             creep.memory.room = creep.room.name;
        //             creep.moveTo(storeRoomPosittion);
        //         } else {
        //             if(creep.transfer(targetLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //                 creep.moveTo(targetLink, {visualizePathStyle: {stroke: '#ffffff'}});
        //             }
        //         }

        //     } else {
        //         creep.moveTo(storeRoomPosittion);
        //     }
        // }

        if(creep.store.getFreeCapacity() > 0) {
            if (creep.room.name === harvesterRoom && Game.rooms[harvesterRoom]) {
                const sources = creep.room.find(FIND_SOURCES);
                if(sources.length > 0) {
                    if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
                } else {
                    creep.say('没有找到资源');
                }
            } else {
                creep.moveTo(harvesterRoomPosittion);
            }
        }
        else if (targetLink) {
            if (creep.room.name == storeRoom && storeRoomObjet) {
                if(creep.transfer(targetLink, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetLink, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.moveTo(storeRoomPosittion);
            }
        }

    }

}

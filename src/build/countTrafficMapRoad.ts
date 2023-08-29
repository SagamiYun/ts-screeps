export function countTrafficMapRoad(creep: Creep) {
    // 在creep的角色代码中，每当creep移动时，记录其位置
    creep.memory.path = creep.memory.path || [];
    creep.memory.path.push({roomPos: creep.pos, count: 0});

    // 在每个tick结束时，统计所有creep走过的位置
    Game.rooms[creep.room.name].memory.roadPositions = Game.rooms[creep.room.name].memory.roadPositions || {};

    if(creep.memory.path) {
        for(let i in creep.memory.path) {
            let pos = creep.memory.path[i];
            let key = pos.roomPos.x + ',' + pos.roomPos.y;
            if(!Game.rooms[creep.room.name].memory.roadPositions[key]) {
                Game.rooms[creep.room.name].memory.roadPositions[key] = {x: pos.roomPos.x, y: pos.roomPos.y, count: 0};
            }
            Game.rooms[creep.room.name].memory.roadPositions[key].count++;
        }
        // 清除creep的路径，为下一个tick做准备
        delete creep.memory.path;
    }

}

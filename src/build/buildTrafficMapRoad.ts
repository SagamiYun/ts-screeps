const TRAFFIC_THRESHOLD = 100;  // creep经过的坐标升级阀值

export function buildTrafficMapRoad(creep: Creep) {
    // 在creep的角色代码中，每当creep移动时，记录其位置
    if(!creep.memory.path) {
        creep.memory.path = [];
    }
    creep.memory.path.push({...creep.pos, count: 0});

    // 在每个tick结束时，统计所有creep走过的位置
    let positions: {[key: string]: {x: number, y: number, count: number}} = {};

    console.log(positions);
    if(creep.memory.path) {
        for(var i in creep.memory.path) {
            var pos = creep.memory.path[i];
            var key = pos.x + ',' + pos.y;
            if(!positions[key]) {
                positions[key] = {x: pos.x, y: pos.y, count: 0};
            }
            positions[key].count++;
        }
        // 清除creep的路径，为下一个tick做准备
        delete creep.memory.path;
    }

    // 检查哪些位置被多次经过，并在那里建立道路
    const threshold = 50; // 设置阈值，你可以根据需要调整
    for(let key in positions) {
        const pos = positions[key];
        console.log(pos.x, pos.y, pos.count)
        if(pos.count >= threshold) {
            // 在该位置创建道路
            var room = Game.rooms[creep.room.name];
            room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD);
        }
    }

    // // 在creep的每个行动步骤中，增加该位置的通行次数
    // const creep = Game.creeps['Creep1'];
    // const key = `${creep.pos.roomName},${creep.pos.x},${creep.pos.y}`;

    // if (!Memory.trafficMap[key]) {
    //     Memory.trafficMap[key] = 0;
    // }

    // Memory.trafficMap[key]++;

    // // 如果一个位置的通行次数超过一定的阈值，就在这个位置上建立道路
    // if (Memory.trafficMap[key] > TRAFFIC_THRESHOLD) {
    //     // 在这个位置上建立道路
    //     const pos = new RoomPosition(creep.pos.x, creep.pos.y, creep.pos.roomName);
    //     pos.createConstructionSite(STRUCTURE_ROAD);
    // }
  }

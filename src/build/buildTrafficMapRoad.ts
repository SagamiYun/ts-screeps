const TRAFFIC_THRESHOLD = 10;  // creep经过的坐标升级阀值

export function buildTrafficMapRoad(room: Room) {
    // 检查哪些位置被多次经过，并在那里建立道路
    for(let key in room.memory.roadPositions) {
        const pos = room.memory.roadPositions[key];
        if(pos.count >= TRAFFIC_THRESHOLD) {
            // 在该位置创建道路
            if (room.createConstructionSite(pos.x, pos.y, STRUCTURE_ROAD) === 0) {
                console.log("在此位置建造了道路: " + pos.x, pos.y,)
            }
        }
    }

}

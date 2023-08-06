const TRAFFIC_THRESHOLD = 100;  // creep经过的坐标升级成

export function buildTrafficMapRoad() {
    // 在creep的每个行动步骤中，增加该位置的通行次数
    const creep = Game.creeps['Creep1'];
    const key = `${creep.pos.roomName},${creep.pos.x},${creep.pos.y}`;

    if (!Memory.trafficMap[key]) {
        Memory.trafficMap[key] = 0;
    }

    Memory.trafficMap[key]++;

    // 如果一个位置的通行次数超过一定的阈值，就在这个位置上建立道路
    if (Memory.trafficMap[key] > TRAFFIC_THRESHOLD) {
        // 在这个位置上建立道路
        const pos = new RoomPosition(creep.pos.x, creep.pos.y, creep.pos.roomName);
        pos.createConstructionSite(STRUCTURE_ROAD);
    }
  }

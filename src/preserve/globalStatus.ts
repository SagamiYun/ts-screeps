export enum IRoomStatus {
    DEFENSEMODE = 'defenseMode', // 防御模式
    ATTACKSUPPLYMODE = 'attackSupplyMode', // 攻击补给模式
    COLONYEXPANSIONMODE = 'colonyExpansionMode', // 殖民地扩展模式
    RESOURCESHORTAGEMODE = 'resourceShortageMode', // 资源不足模式
    NORMALMODE = 'normalMode', // 平常模式
    SMALEBOSEMODE = 'smaleBaseMode', // 小殖民地模式
    BUILDINGMODE = 'buildingMode', // 建造模式
}

const defenseModeCooldown = 5; // 默认冷却tick


export function loopGlobalStatus(room: Room) {
    const enemies = Game.rooms[room.name].find(FIND_HOSTILE_CREEPS);

    const roomStatus = room.memory.status;
    const coolwodn = room.memory.statusCooldown;

    room.memory.status = room.memory.status || IRoomStatus.NORMALMODE
    room.memory.statusCooldown = room.memory.statusCooldown || 0


    if (enemies.length > 0) {
        // 如果有敌人，激活防御模式
        room.memory.status = IRoomStatus.DEFENSEMODE;
    } else {
        // 如果没有敌人，但是防御模式是激活的，那么设置一个计时器来关闭防御模式
        if (!coolwodn && (roomStatus === IRoomStatus.DEFENSEMODE)) {
            room.memory.statusCooldown = defenseModeCooldown;
        } else if (coolwodn > 1) {
            room.memory.statusCooldown--;
        } else if(Object.keys(Game.constructionSites).length > 5) {
            // 建筑工地大于5，开启建筑模式
            room.memory.status = IRoomStatus.BUILDINGMODE;
            room.memory.statusCooldown = 0;
        } else {
            room.memory.status = IRoomStatus.NORMALMODE;
            room.memory.statusCooldown = 0;
        }

    }

    console.log("房间: " + room.name + "的状态为: " + roomStatus + " 定时器状态为: " + room.memory.statusCooldown)
}

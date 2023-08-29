export interface CreepConfig {
    role: CreepRole;
    body: BodyPartConstant[];
}

export enum CreepRole {
    HARVESTER = 'harvester',   // 采集
    CARRIER = 'carrier',   // 搬运
    BUILDER = 'builder',   // 建造
    UPGRADER = 'upgrader',   // 升级
    REPAIRER = 'repairer',   // 维护及修复
    FIGHTER = 'fighter',   // 战斗
    CLAIMER = 'claimer',   // 标注及扩展领地
    BIGFREE = 'bigfree',
    SMALLFREE = 'smallfree',
    EXTERIORHARVESTER = 'exteriorHayverter', // 外部采集
}

export const CREEP_CONFIGS: Record<CreepRole, CreepConfig> = {
    [CreepRole.HARVESTER]: {
        role: CreepRole.HARVESTER,
        body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
    [CreepRole.CARRIER]: {
        role: CreepRole.CARRIER,
        body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
    [CreepRole.BUILDER]: {
        role: CreepRole.BUILDER,
        body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
    [CreepRole.UPGRADER]: {
        role: CreepRole.UPGRADER,
        body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
    [CreepRole.REPAIRER]: {
        role: CreepRole.REPAIRER,
        body: [WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE]
    },
    [CreepRole.FIGHTER]: {
        role: CreepRole.FIGHTER,
        body: [TOUGH, ATTACK, MOVE, MOVE]
    },
    [CreepRole.CLAIMER]: {
        role: CreepRole.FIGHTER,
        body: [CLAIM, MOVE]
    },
    [CreepRole.BIGFREE]: {
        role: CreepRole.BIGFREE,
        body: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
    },
    [CreepRole.SMALLFREE]: {
        role: CreepRole.SMALLFREE,
        body: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
    [CreepRole.EXTERIORHARVESTER]: {
        role: CreepRole.EXTERIORHARVESTER,
        body: [WORK, CARRY, CARRY, MOVE]
    },
};


export interface CreepConfig {
    role: CreepRole;
    body: BodyPartConstant[];
}

export enum CreepRole {
    HARVESTER = 'harvester',
    CARRIER = 'carrier',
    BUILDER = 'builder',
    UPGRADER = 'upgrader',
    REPAIRER = 'repairer',
    FIGHTER = 'fighter',
    BIGFREE = 'bigfree',
    SMALLFREE = 'smallfree'
}

export const CREEP_CONFIGS: Record<CreepRole, CreepConfig> = {
    [CreepRole.HARVESTER]: {
        role: CreepRole.HARVESTER,
        body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
    },
    [CreepRole.CARRIER]: {
        role: CreepRole.CARRIER,
        body: [CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
    },
    [CreepRole.BUILDER]: {
        role: CreepRole.BUILDER,
        body: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE]
    },
    [CreepRole.UPGRADER]: {
        role: CreepRole.UPGRADER,
        body: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
    },
    [CreepRole.REPAIRER]: {
        role: CreepRole.REPAIRER,
        body: [WORK, WORK, WORK, CARRY, MOVE, MOVE]
    },
    [CreepRole.FIGHTER]: {
        role: CreepRole.FIGHTER,
        body: [TOUGH, ATTACK, MOVE, MOVE]
    },
    [CreepRole.BIGFREE]: {
        role: CreepRole.BIGFREE,
        body: [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
    },
    [CreepRole.SMALLFREE]: {
        role: CreepRole.SMALLFREE,
        body: [WORK, CARRY, MOVE]
    },
};


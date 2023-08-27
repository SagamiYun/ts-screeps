import { CreepRole, CREEP_CONFIGS } from '../type/creepType';


export function createCreep(role: CreepRole, spawn: StructureSpawn) {
    const config = CREEP_CONFIGS[role];

    spawn.spawnCreep(config.body, config.role + ": " + Date.now(), {memory: {role: config.role, room: spawn.room.name}});
}


export function createCustomCreep(role: string, body: BodyPartConstant[], spawn: StructureSpawn) {
    spawn.spawnCreep(body, role + ": " + Date.now(), {memory: { role }});
}

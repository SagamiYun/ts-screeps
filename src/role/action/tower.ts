export const roleTower = {
    run: function(tower: StructureTower) {
        // Find closest hostile
        const closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
            return;
        }

        // If no hostiles, then heal any injured creeps
        const closestDamagedCreep = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: (creep) => creep.hits < creep.hitsMax
        });
        if(closestDamagedCreep) {
            tower.heal(closestDamagedCreep);
            return;
        }

        // If no injured creeps, then repair buildings - start with ramparts
        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_RAMPART
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
            return;
        }

        // If no ramparts need repair, then repair roads
        closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax && structure.structureType == STRUCTURE_ROAD
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
            return;
        }

        // If no roads need repair, then repair other structures
        closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
    }
};

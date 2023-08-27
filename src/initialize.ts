// initFun
export const initialize = (): void => {
    console.log("push main OJ8K!");
    console.log("start init!");

    // start Buid extension
    // buildExtensionsAroundSpawn("Spawn1", 5);
}

function buildExtensionsAroundSpawn(spawnName: string, extensionCount: number) {
    const spawn = Game.spawns[spawnName];
    if (!spawn) {
        console.log('Spawn not found');
        return;
    }

    const directions = [
        [0, -1], [-1, 0], [0, 1], [1, 0], // top, left, bottom, right
        [-1, -1], [1, -1], [-1, 1], [1, 1] // top-left, top-right, bottom-left, bottom-right
    ];

    let builtCount = 0;
    for (let range = 1; range <= 5; range++) {
        for (let dir of directions) {
            const x = spawn.pos.x + dir[0] * range;
            const y = spawn.pos.y + dir[1] * range;
            const result = spawn.room.createConstructionSite(x, y, STRUCTURE_EXTENSION);
            if (result === OK) {
                builtCount++;
                if (builtCount >= extensionCount) {
                    return;
                }
            }
        }
    }
    console.log("start over!");
}

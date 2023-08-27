import { valuesIn } from "lodash";

export const roleClaimer = {

    run: function(creep: Creep, targetRoom: string | undefined, roomSign: string | undefined) {

        if (targetRoom) {
            if(creep.memory.roomMoving && creep.room.name === targetRoom) {
                creep.memory.roomMoving = false;
                creep.say('come');
            }
            if(!creep.memory.roomMoving && creep.room.name !== targetRoom) {
                creep.memory.roomMoving = true;
                creep.say('moving');
            }

            creep.memory.targetRoom = targetRoom;
            creep.memory.room = creep.room.name;

            console.log(creep.memory.roomMoving)

            // const targetCon = Game.rooms[creep.memory.targetRoom].controller;
            // if (targetCon) {
            //     // 如果creep在目标房间，找到控制器并尝试claim或reserve
            //     if(creep.room.name === creep.memory.targetRoom && !creep.memory.roomMoving) {
            //         if(creep.claimController(targetCon) === ERR_NOT_IN_RANGE) {
            //             creep.moveTo(targetCon);
            //         }
            //     } else if(creep.room.name !== creep.memory.targetRoom && creep.memory.roomMoving) {
            //         // Creep不在目标房间，需要前往目标房间
            //         let exitDir = Game.map.findExit(creep.room, creep.memory.targetRoom);
            //          // @ts-ignore
            //         let closestExit = creep.pos.findClosestByPath(exitDir);
            //         if(closestExit) {
            //             creep.moveTo(closestExit);
            //         }
            //     }
            // }
            // 如果creep不在目标房间
            if(creep.room.name != creep.memory.targetRoom && creep.memory.roomMoving) {
                // 找到目标房间并移动到那里
                let exitDir = creep.room.findExitTo(creep.memory.targetRoom) as ExitConstant;

                console.log("执行了 去往房间分支")

                let exits = creep.room.find(exitDir);
                let closestExit = creep.pos.findClosestByPath(exits);
                closestExit && creep.moveTo(closestExit);
            } else {
                const targetCon = creep.room.controller;
                console.log(targetCon)
                if (targetCon) {
                    // 如果creep在目标房间，找到控制器并尝试claim或reserve

                    if(creep.claimController(targetCon) == ERR_NOT_IN_RANGE) {
                        console.log("执行了ClaimController分支")
                        creep.moveTo(targetCon);
                    }
                    // 如果你只想reserve控制器，而不是claim，你可以使用reserveController方法替换claimController
                    // if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    //     creep.moveTo(creep.room.controller);
                    // }
                }
            }
        } else if (roomSign) {
            const targetController = creep.room.controller;

            if (targetController)
            if(creep.signController(targetController, roomSign) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targetController);
            }
        }
    }
};

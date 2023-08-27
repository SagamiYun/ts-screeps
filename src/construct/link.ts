export function constructLink(): void {
    const targetLink: StructureLink | null = Game.getObjectById('64eb082d587a557eba071138');
    const sourceLink: StructureLink | null = Game.getObjectById('64eafd140ec2c588b6787f74');

    if (targetLink && sourceLink) {
        if (sourceLink.cooldown > 0) { // 检查源Link是否在冷却中
            return ;
        }

        if (sourceLink.energy === 0) { // 检查源Link是否有能量可供传输
            return ;
        }

        if (targetLink.store.getFreeCapacity(RESOURCE_ENERGY) === 0) { // 检查目标Link是否有足够的空间接收能量
            return ;
        }

        // 如果主Link的能量大于700，则向副Link发送能量
        if (sourceLink.store[RESOURCE_ENERGY] > 700) {
             // 传输能量
            sourceLink?.transferEnergy(targetLink);

            // secondaryLinks.forEach(link => {
            //     if (link.store[RESOURCE_ENERGY] < link.store.getCapacity(RESOURCE_ENERGY)) {
            //         mainLink.transferEnergy(link);
            //     }
            // });
        }
    }
}



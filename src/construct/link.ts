export function constructLink() {
    const mainLinkId = 'xxxxxxxxxxxx';
    const mainLink = Game.getObjectById(mainLinkId);

    // 副Link的id数组
    const secondaryLinkIds = ['yyyyyyyyyyyy', 'zzzzzzzzzzzz'];
    const secondaryLinks = secondaryLinkIds.map(id => Game.getObjectById(id));

    // 如果主Link的能量大于200，则向副Link发送能量
    // if (mainLink?.store[RESOURCE_ENERGY] > 200) {
    //     secondaryLinks.forEach(link => {
    //         if (link?.store[RESOURCE_ENERGY] < link?.store.getCapacity(RESOURCE_ENERGY)) {
    //             mainLink?.transferEnergy(link);
    //         }
    //     });
    // }
}

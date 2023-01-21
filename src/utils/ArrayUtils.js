export const joinPlatforms = (platforms) => {
    var platform = [];

    platforms?.forEach((currentPlatform) => { 
        //console.log(currentPlatform.platform);       
        platform.push(currentPlatform.platform.name);
    })
    //console.log('plat: '+platform);
    return platform.join(",");
}
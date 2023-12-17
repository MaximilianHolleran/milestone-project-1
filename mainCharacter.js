function playableCharacter(x, y) {
    const element = newImage('./assets/GrapemanIdle.gif')
    element.style.zIndex = 1;

    function handleDirectionChange(direction) {
        if (direction === null) {
            element.src = `./assets/GrapemanIdle.gif`
        }
        if (direction === 'west') {
            element.src = `assets/GrapemanWalking.gif`
        }
        if (direction === 'north') {
            element.src = `assets/GrapemanRaising.gif`
        }
        if (direction === 'east') {
            element.src = `assets/GrapemanWalking.gif`
        }
        if (direction === 'south') {
            element.src = `assets/GrapemanFalling.gif`
        }
    }

    move(element).withArrowKeys(x, y, handleDirectionChange)

    return {
        element: element
    }
}
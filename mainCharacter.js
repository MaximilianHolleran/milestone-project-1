function mainCharacter(x, y) {
    const element = newImage('')
    element.style.zIndex = 1;

    function handleDirectionChange(direction) {
        if (direction === null) {
            element.src = ``
        }
        if (direction === 'west') {
            element.src = ``
        }
        if (direction === 'north') {
            element.src = ``
        }
        if (direction === 'east') {
            element.src = ``
        }
        if (direction === 'south') {
            element.src = ``
        }
    }

    move(element).withArrowKeys(x, y, handleDirectionChange)

    return {
        element: element
    }
}
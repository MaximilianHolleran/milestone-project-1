// Create Main Character
const mainCharacter = newImage('assets/GrapemanIdle.gif')
mainCharacter.style.zIndex = +1

function handleDirectionChange(direction){
    if(direction === null){
        mainCharacter.src = 'assets/GrapemanIdle.gif'
    }
    if(direction === 'west'){
        mainCharacter.src = 'assets/GrapemanWalking.gif'
    }
    if(direction === 'east'){
        mainCharacter.src = 'assets/GrapemanWalking.gif'
    }

    if(direction === 'north'){
        mainCharacter.src = 'assets/GrapemanRaising.gif'
    }
    if(direction === 'south'){
        mainCharacter.src = 'assets/GrapemanFalling.gif'
    }
}

move(mainCharacter).withArrowKeys(100,250,handleDirectionChange)
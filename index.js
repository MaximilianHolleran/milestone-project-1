const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576
let frameCount = 0
const gravity = 1

//player class to create the player
class Player {
    constructor() {
        this.speed = 10
        this.position = { 
            x: 100,
            y: 100
        };
        this.velocity = { 
            x: 0,
            y: 0
        };
        this.width = 62// Adjust as per your sprite sheet frame size
        this.height =  60// Adjust as per your sprite sheet frame size

        // Load sprite sheets
        this.sprites = {
            idleRight: { image: new Image(), frames: 3, currentFrame: 0 },
            idleLeft: { image: new Image(), frames: 3, currentFrame: 0 },
            runRight: { image: new Image(), frames: 4, currentFrame: 0 },
            runLeft: { image: new Image(), frames: 4, currentFrame: 0 },
            jump: { image: new Image(), frames: 3, currentFrame: 0 }
        }

        this.sprites.idleRight.image.src = './assets/idle-right.png'
        this.sprites.idleLeft.image.src = './assets/idle-left.png'
        this.sprites.runRight.image.src = './assets/run-right.png'
        this.sprites.runLeft.image.src = './assets/run-left.png'
        this.sprites.jump.image.src = './assets/jump.png'

        // Current state
        this.currentState = this.sprites.idleRight
    }

    draw() {
        context.drawImage(
            this.currentState.image,
            this.currentState.currentFrame * this.width, 1,  // Source X, Y
            this.width, this.height, // Source width and height
            this.position.x, this.position.y, // Canvas X, Y
            this.width, this.height // Canvas width and height
        );
    }

    update() {
        this.draw()

        // Animation frame update logic
        if (frameCount % 10 === 1) { // Adjust '10' to control speed
            this.currentState.currentFrame = (this.currentState.currentFrame + 1) % this.currentState.frames
        }

        // Movement logic
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } 
    }
}
//platform class to create platforms
class Platform {
    constructor({x, y, image}){
       this.position = {
        x: x,
        y: y,
        image: image
       }
       this.image = image
       this.width = image.width
       this.height = image.height  
       
    }
    draw(){
        context.drawImage( this.image, this.position.x, this.position.y)
    }
}

let player = new Player()

let backgroundImage = new Image()
    backgroundImage.src = './assets/back.png'

let image = new Image()
    image.src = './assets/platform-long.png'

let winImage = new Image()
    winImage.src = './assets/youWin.png'

//adding new platforms
let platforms = [

]

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

//init function resets the game when you fall
function init(){

backgroundImage = new Image()
backgroundImage.src = './assets/back.png'

image = new Image()
image.src = './assets/platform-long.png'

player = new Player()

//adding new platforms
 platforms = [
    new Platform({x: -1, y:520, image}),
    new Platform({x: 125, y:520, image}),
    new Platform({x: 250, y:520, image}),
    new Platform({x: 500, y:520, image}),
    new Platform({x: 625, y:520, image}),
    new Platform({x: 750, y:520, image}),
    new Platform({x: 875, y:520, image}),
    new Platform({x: 1000, y:520, image}),
    new Platform({x: 1200, y:520, image}),
    new Platform({x: 1400, y:520, image}),
    new Platform({x: 1525, y:520, image}),
    new Platform({x: 1700, y:520, image}),
    new Platform({x: 1825, y:520, image}),
    new Platform({x: 2000, y:420, image}),
    new Platform({x: 2000, y:320, image}),
    new Platform({x: 2550, y:520, image}),
    new Platform({x: 2670, y:520, image}),
    new Platform({x: 2900, y:520, image}),
    new Platform({x: 3025, y:420, image}),
    new Platform({x: 3150, y:320, image}),
    new Platform({x: 3300, y:220, image}),
    new Platform({x: 3900, y:520, image}),
    new Platform({x: 4025, y:520, image}),
    new Platform({x: 4150, y:520, image}),
    new Platform({x: 4275, y:520, image}),
    new Platform({x: 4400, y:520, image}),
    new Platform({x: 4800, y:520, image}),
    new Platform({x: 4925, y:520, image}),
    new Platform({x: 5050, y:520, image}),
    new Platform({x: 5175, y:520, image}),
    new Platform({x: 5300, y:520, image}),

]

scrollOffset = 0
}

//adds player/platforms to screen
function animate() {
    requestAnimationFrame(animate)

    // Increment the frame count
    frameCount++

    // Drawing the background image
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height)

    // Drawing platforms
    platforms.forEach((platform) => {
        platform.draw()
    })

    // Updating the player
    player.update()

    // Handling right movement
    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if ((keys.left.pressed && player.position.x > 100) ||
     (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0
        // Handle scrolling effect
        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
        } else if (keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
        }
    }

    // Platform collision detection
    platforms.forEach((platform) => {
        if (player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + player.width >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

    // Win condition
    if (scrollOffset > 4900) {
        context.drawImage(winImage, 0, 0, canvas.width, canvas.height)
        return
    }

    // Lose condition
    if (player.position.y > canvas.height) {
        init()
    }
}


// keydown controls to move
addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 37: // Left arrow
            console.log('left')
            keys.left.pressed = true;
            player.currentState = player.sprites.runLeft // Switch to running left animation
            player.currentState.currentFrame = 0 // Reset animation frame
            break

        case 39: // Right arrow
            console.log('right')
            keys.right.pressed = true
            player.currentState = player.sprites.runRight; // Switch to running right animation
            player.currentState.currentFrame = 0 // Reset animation frame
            break

        case 32: // Spacebar
            console.log('up')
            player.velocity.y -= 15
            player.currentState = player.sprites.jump // Switch to jumping animation
            player.currentState.currentFrame = 0 // Reset animation frame
            break

    }
})
//keyup controls to stop moving
addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 37: // Left arrow
            console.log('left')
            keys.left.pressed = false
            player.currentState = player.sprites.idleLeft // Switch to idle left animation
            player.currentState.currentFrame = 0 // Reset animation frame
            break;

        case 39: // Right arrow
            console.log('right')
            keys.right.pressed = false
            player.currentState = player.sprites.idleRight // Switch to idle right animation
            player.currentState.currentFrame = 0 // Reset animation frame
            break;

        case 32: // Space bar
            console.log('up')
            // Decide the idle state based on the last direction of movement
            break
    }
})

init()
animate()
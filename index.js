

const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1
//player class to create the player
class Player {
    constructor() {
        this.speed = 10
        this.position = { 
            x: 100,
            y: 100
        }
        this.velocity = { 
            x: 0,
            y: 0
        }
        this.width = 30 
        this.height = 30
    }
    draw() {
        context.fillStyle = 'red'
        context.fillRect(this.position.x,this.position.y,
             this.width, this.height
            )
    }

    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y +this.height + 
        this.velocity.y <= canvas.height)
        this.velocity.y += gravity
        
        
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

let backgroundImage = new Image();
backgroundImage.src = './assets/back.png';

let image = new Image()
image.src = './assets/platform-long.png'

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

backgroundImage = new Image();
backgroundImage.src = './assets/back.png';

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

]

scrollOffset = 0
}

//adds player/platforms to screen
function animate() {
    requestAnimationFrame(animate)
    context.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update() //move player update lower so it shows up in front of platforms

    if (keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed} 
        else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -player.speed} 
        else {player.velocity.x = 0
//created scrolling effect
        if (keys.right.pressed) { 
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
                })
             } 
        else if (keys.left.pressed) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
        }
    }

    
    //platform colision detection
    platforms.forEach((platform) => {
    if (
        player.position.y + player.height <=
            platform.position.y &&
         player.position.y + player.height +
            player.velocity.y >= 
            platform.position.y && 
        player.position.x + player.width >= 
        platform.position.x && 
        player.position.x <= platform.position.x + platform.width
        ){
            player.velocity.y = 0
        }
    })
    //win condition
    if (scrollOffset > 1000) {
        console.log('you win')
    }
    //lose condition
    if (player.position.y > canvas.height) {
        init()
    }
}

init()
animate()
// keydown controls to move
addEventListener('keydown', ({ keyCode }) =>{
    
    switch (keyCode) {
        case 37:
            console.log('left')
            keys.left.pressed = true
            break

        case 39:
            console.log('right')
            keys.right.pressed = true
            break

        case 32:
            console.log('up')
            player.velocity.y -= 10
            break

        case 40:
            console.log('down')
            break
    }
    
})
//keyup controls to stop moving
addEventListener('keyup', ({ keyCode }) =>{
    
    switch (keyCode) {
        case 37:
            console.log('left')
            keys.left.pressed = false
            break

        case 39:
            console.log('right')
            keys.right.pressed = false
            break

        // case 32:
        //     console.log('up')
        //     player.velocity.y -= 8
        //     break 

        case 40:
            console.log('down')
            break
    }
    

})
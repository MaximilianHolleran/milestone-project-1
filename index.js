import platform from './assets/platform-long.png'


const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = .25
//player class to create the player
class Player {
    constructor() {
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
        else this.velocity.y = 0
        
    }
}
//platform class to create platforms
class Platform {
    constructor({x, y, image}){
       this.position = {
        x: x,
        y: y
       }

       this.width = 200
       this.height = 20

       this.image = image
    }

    draw(){
        canvas.drawImage(this.image, this.position.x, this.position.y)
    }
}

const image = new Image()
image.src = platform


const player = new Player()
//adding new platforms
const platforms = [
    new Platform({x: 600, y:1300, image: ''}),
    new Platform({x: 800, y:1200}),
    new Platform({x: 1000, y:1100}),
    new Platform({x: 1200, y:1000})

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

//adds player/platforms to screen
function animate() {
    requestAnimationFrame(animate) 
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach((platform) => {
        platform.draw()
    })
    
    if (keys.right.pressed && player.position.x < 410) {
        player.velocity.x = 1} 
        else if (keys.left.pressed && player.position.x > 100) {
        player.velocity.x = -1} 
        else {player.velocity.x = 0
//created scrolling effect
        if (keys.right.pressed) { 
            scrollOffset += 1
            platforms.forEach((platform) => {
                platform.position.x -= 1
                })
             } 
        else if (keys.left.pressed) {
            scrollOffset -= 1
            platforms.forEach((platform) => {
                platform.position.x += 1
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

    if (scrollOffset > 1000) {
        console.log('you win')
    }
}
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
            player.velocity.y -= 15
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
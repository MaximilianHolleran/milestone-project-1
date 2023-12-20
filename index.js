const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const gravity = .25

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

const player = new Player()
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}


function animate() {
    requestAnimationFrame(animate) 
    context.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    if (keys.right.pressed) {
        player.velocity.x = 1
    } else if (keys.left.pressed) {
        player.velocity.x = -1
    } 
    else player.velocity.x = 0 
}
animate()

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

        case 38:
            console.log('up')
            player.velocity.y -= 8
            break

        case 40:
            console.log('down')
            break
    }
    
})

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

        case 38:
            console.log('up')
            player.velocity.y -= 10
            break

        case 40:
            console.log('down')
            break
    }
    

})
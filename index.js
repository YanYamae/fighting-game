const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); //canvas context

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)


const gravity = 0.7


const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/noShop1024x576.png'
})

const shop = new Sprite({
    position: {
        x: 620,
        y: 161
    },
    imageSrc: './img/decorations/shop_anim.png',
    scale: 2.70,
    framesMax: 6,
    framesHold: 8 // velocity of shop animation
})


const player = new Fighter({ //using the class to build player
    position: { //start at
        x: 250,
        y: 0
    },
    velocity: { //moovement
        x: 0,
        y: 0
    },
    color: 'red' ,
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Martial Hero/Sprites/Idle.png',
    scale: 2.5,
    framesMax: 8,
    framesHold: 6, // velocity of player animation
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: './img/Martial Hero/Sprites/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/Martial Hero/Sprites/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/Martial Hero/Sprites/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/Martial Hero/Sprites/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/Martial Hero/Sprites/Attack1.png',
            framesMax: 6,
        },
        takeHit: {
            imageSrc: './img/Martial Hero/Sprites/Take hit.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/Martial Hero/Sprites/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 80,
            y: 35
        },
        width: 175,
        height: 60
    }
})

// player.draw() now it is called on update()

const enemy = new Fighter({ //using the class to build enemy
    position: {
        x: 700,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue' ,
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/Martial Hero 2/Sprites/Idle.png',
    scale: 2.3,
    framesMax: 4,
    framesHold: 10, // velocity of enemy animation
    offset: {
        x: 215,
        y: 147
    },
    sprites: {
        idle: {
            imageSrc: './img/Martial Hero 2/Sprites/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/Martial Hero 2/Sprites/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/Martial Hero 2/Sprites/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/Martial Hero 2/Sprites/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/Martial Hero 2/Sprites/Attack1.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/Martial Hero 2/Sprites/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/Martial Hero 2/Sprites/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 35
        },
        width: 175,
        height: 60
    }
})

// enemy.draw()  now it is called on update()

console.log(player)

const keys = { //fix the value of all keys like false, this ensures that the champions stay stoped when any key is pressed
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
} //help the if of animate() to have more accurate information

decreaseTimer()

function animate(){ //this function start a frame loop at window
    window.requestAnimationFrame(animate) //self call, infinity loop
    // console.log('go') test the loop
    c.fillStyle = 'black' //?whys this dosent conflic with the first fillStyle inside of draw()?
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = 'rgba(255,255,255, 0.08)'
    c.fillRect(0,0, canvas.width, canvas.height)
    player.update() // put the player in the canvas
    enemy.update() // put the enemy in the canvas

    player.velocity.x = 0 //fix the player volocity to 0, else the champion keep on mooving
    enemy.velocity.x = 0

    //player moovement
    if (keys.a.pressed && player.lastkey === 'a'){ //this statement make the champions moove if the pressed key is true and the last key is that one, it ensures no conflicts in the case of two keys are being pressed at the same time
        player.velocity.x = -5
        player.switchSprite('run')
    }else if (keys.d.pressed && player.lastkey === 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    }else {
        player.switchSprite('idle')
    }
    // jumping
    if (player.velocity.y < 0) {
        player.switchSprite('jump')
    } else if (player.velocity.y > 0){
        player.switchSprite('fall')
    }

    //enemy moovement
    if (keys.ArrowLeft.pressed && enemy.lastkey === 'ArrowLeft'){ //this statement make the champions moove if the pressed key is true and the last key is that one, it ensures no conflicts in the case of two keys are being pressed at the same time
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }else if (keys.ArrowRight.pressed && enemy.lastkey === 'ArrowRight'){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    } else {
        enemy.switchSprite('idle')
    }

    // jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprite('jump')
    } else if (enemy.velocity.y > 0){
        enemy.switchSprite('fall')
    }

    // detect for collision & enemy gets hit
    if ( // make the attackBox hit enemy respecting the position start "x" and your extension "width" and the same for the "y/height"
        rectangularCollision({
            rectangle1: player,
            rectangle2: enemy
        }) &&
        player.isAttacking && // this if just work if the isAttacking was true (the spacebar turn it true)
        player.framesCurrent === 4 // just hit at the 4th frame
        ) {
            enemy.takeHit()
            player.isAttacking = false // fix the attack for dont hit multiple times when the spacebar is pressed
            console.log('player hit') // test the hit
            // document.querySelector('#enemyHealth').style.width = enemy.health + '%' // transform the enemy health in porcent
            gsap.to('#enemyHealth', {
                width: enemy.health + '%'
            })
        }

    // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }

    if ( // make the attackBox hit enemy respecting the position start "x" and your extension "width" and the same for the "y/height"
    rectangularCollision({
        rectangle1: enemy,
        rectangle2: player
    }) &&
    enemy.isAttacking && //this if just work if the isAttacking was true (the spacebar turn it true)
    enemy.framesCurrent === 2 // just hit at the 2th frame
    ) {
        player.takeHit()
        enemy.isAttacking = false //fix the attack for dont hit multiple times when the spacebar is pressed
        console.log('enemy hit') //test the hit
        // document.querySelector('#playerHealth').style.width = player.health + '%' // transform the player health in porcent
        gsap.to('#playerHealth', {
            width: player.health + '%'
        })
    }

    // if enemy misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }

    //end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
        determineWinner({player, enemy, timerId})
    }
}

animate()

window.addEventListener('keydown', (event) =>{ //here we take the keydown comand of players
    if (!player.dead){
        switch (event.key){ //return true for the if inside of animate()
            //players keys
            case 'd':
                keys.d.pressed = true 
                player.lastkey = 'd' //help the if of animate() to have more accurate information
            break
            case 'a':
                keys.a.pressed = true
                player.lastkey = 'a'
            break
            case 'w':
                player.velocity.y = -20
            break
            case ' ':
                player.attack()
            break
        }
    }
    if (!enemy.dead){
        switch (event.key){
            //enemy keys
            case 'ArrowRight':
                keys.ArrowRight.pressed = true 
                enemy.lastkey = 'ArrowRight'
            break
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastkey = 'ArrowLeft'
            break
            case 'ArrowUp':
                enemy.velocity.y = -20
            break
            case 'ArrowDown':
                enemy.attack()
            break
        }
    }
    //console.log(event.key)
})

window.addEventListener('keyup', (event) =>{ //here we take the keyup comand of players
    switch (event.key){ //return false for the if inside of animate()
        case 'd':
            keys.d.pressed = false 
        break
        case 'a':
            keys.a.pressed	= false
        break
    }
    switch (event.key){ //return false for the if inside of animate()
        case 'ArrowRight':
            keys.ArrowRight.pressed = false 
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed	= false
        break
    }
    //console.log(event.key) // saw what key is working
})

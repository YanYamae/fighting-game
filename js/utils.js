function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({player, enemy, timerId}) {

    clearTimeout(timerId)
    document.querySelector('#displayText').style.display = 'flex' // amazing, it modify the tipe of css display bcs that one first was = none
    if (player.health === enemy.health){ // tie
        document.querySelector('#displayText').innerHTML = 'Tie'
        c.fillStyle = 'rgba(0,0,0, 0.7)'
        c.fillRect(0,0, canvas.width, canvas.height)

    } else if (player.health > enemy.health){ // player wins
        document.querySelector('#displayText').innerHTML = 'Player 1 Wins'
        c.fillStyle = 'rgba(0,0,0, 0.7)'
        c.fillRect(0,0, canvas.width, canvas.height)

    } else if (player.health < enemy.health){ // enemy wins
        document.querySelector('#displayText').innerHTML = 'Player 2 Wins'
        c.fillStyle = 'rgba(0,0,0, 0.7)'
        c.fillRect(0,0, canvas.width, canvas.height)
    }
}

let timer = 60
let timerId // stop the timer when some player die
function decreaseTimer(){
    
    if (timer > 0) { // make the countdown
        timerId = setTimeout(decreaseTimer, 1000) // after 1sec it is called, seting 1sec to progress the loop
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer === 0) {
        determineWinner({player, enemy, timerId})
    }
}